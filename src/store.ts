import TimeQueue from 'timequeue'
import EventEmiiter from 'events'
import { uid } from 'uid'
import XennonTypes from "./types";
import fs from 'fs'

const DefaultStoreOptions: XennonTypes.DefaultStoreOptions = {
    name: 'store',
    path: process.cwd() + '/XennonStore',
    backups: {
        enabled: true,
        interval: '1 hour'
    }
}
const DefaultFilterOptions: XennonTypes.DefaultFilterOptions = {
    strict: false
}
export default class XennonStore extends EventEmiiter.EventEmitter {
    private backups
    private options
    worker: (action: any, callback?: any) => void;

    constructor(options: XennonTypes.DefaultStoreOptions = DefaultStoreOptions) {
        super()
        this.options = options
        if (!this.options.name) this.options.name = DefaultStoreOptions.name
        if (!this.options.path) this.options.path = DefaultStoreOptions.path
        if (!this.options.backups.enabled) this.options.backups.enabled = DefaultStoreOptions.backups.enabled
        if (!this.options.backups.interval) this.options.backups.interval = DefaultStoreOptions.backups.interval

        this._ensureCreated('folder', this.options.path)
        this._ensureCreated('file', `${this.options.path}/${this.options.name}.json`)

        this.worker = (action, callback = null) => { }
    }
    _ensureCreated(type, dir) {
        const exists = fs.existsSync(dir);

        if (exists) return true; else {
            if (type === 'file') {
                fs.writeFileSync(`${this.options.path}/${this.options.name}.json`, '{}');
                return true;
            }

            if (type === 'folder') {
                fs.mkdirSync(this.options.path);
                return true;
            }
        }
    }

    /**
     * Helper to check if a variable is an object
     * @param {*} obj Any variable to check
     * @returns {Boolean} A boolean indicating whether the variable is an object or not
     * 
     * @example <caption>Check if a variable is an object</caption>
     * Store._isObject(['array'])
     */
    _isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    /**
     * Helper to simplify fetching an item's ID using multiple filter methods
     * @private
     * @param {Object | Function | String} filter Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
     * @returns {String | undefined} The ID of the item, or undefined if none can be found
     * 
     * @example <caption>Get an item ID using a filter object</caption>
     * Store._get({ myProp: 'myVal' })
     * 
     * @example <caption>Get an item ID using an item's ID</caption>
     * Store._get('2xuxhuoyd5h5563v')
     */
    _get(filter) {
        return new Promise(async (resolve, reject) => {
            // Object
            if (this._isObject(filter)) {
                const item = await this.only(filter);
                if (!item || !item.length) return resolve(undefined);

                return resolve(item[0]._id);
            }

            // Function
            if (typeof (filter) === 'function') {
                const item = await this.find(filter);
                if (!item) return resolve(undefined);

                return resolve(item._id);
            }

            // ID
            const item = await this.get(filter);
            if (!item) return resolve(undefined);

            return resolve(item._id);
        });
    }

    /**
     * Start the scheduled backups, using the store's backupInterval option
     * @returns {Boolean} A boolean indicating the result of the action
     * @fires Store#backupsStarted
     * 
     * @example <caption>Start scheduled backups</caption>
     * Store.startBackups()
     */
    startBackups() {
        return new Promise(async (resolve, reject) => {
            if (this.backupInterval !== null) return reject(`Backups already running`);

            this.backupInterval = setInterval(() => { this.backup(); }, this.options.backupInterval);

            /**
             * Fires when scheduled backups are started
             * 
             * @event Store#backupsStarted
             */
            this.emit('backupsStarted');

            return resolve(true);
        });
    }

    /**
     * Stop the scheduled backups
     * @returns {Boolean} A boolean indicating the result of the action
     * @fires Store#backupsStopped
     * 
     * @example <caption>Stop scheduled backups</caption>
     * Store.stopBackups()
     */
    stopBackups() {
        return new Promise(async (resolve, reject) => {
            if (this.backupInterval === null) return reject(`Backups are not running`);

            clearInterval(this.backupInterval);
            this.backupInterval = null;

            /**
             * Fires when scheduled backups are stopped
             * 
             * @event Store#backupsStopped
             */
            this.emit('backupsStopped');

            return resolve(true);
        });
    }

    /**
     * Create a backup of the store
     * @param {Boolean} [scheduled=false] A boolean indicating whether the backup is made by the scheduled backup interval or manually
     * @returns {Boolean} A boolean indicating the result of the action
     * @fires Store#backup 
     * 
     * @example <caption>Make a backup of the store</caption>
     * Store.backup()
     */
    backup(scheduled = false) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => {
                fs.copyFileSync(`${this.options.path}/${this.options.name}.json`, `${this.options.path}/${this.options.name}--backup.json`);
            }, () => {
                /**
                 * Fires when a new backup has been made
                 * 
                 * @event Store#backup
                 * @type {Object}
                 * @property {String} path The full path and filename, indicating where the backup is located
                 * @property {Boolean} scheduled A boolean indicating whether the backup is scheduled or not
                 */
                this.emit('backup', {
                    path: `${this.options.path}/${this.options.name}--backup.json`,
                    scheduled
                });

                resolve(true);
            });
        });
    }

    /**
     * Replace the store's contents with the contents of an earlier or previous backup
     * @returns {Boolean} A boolean indicating the result of the action
     * @fires Store#restore
     * 
     * @example <caption>Restore the store from backup</caption>
     * Store.restore()
     */
    restore() {
        return new Promise((resolve, reject) => {
            const backupExists = fs.existsSync(`${this.options.path}/${this.options.name}--backup.json`);

            if (!backupExists)
                return reject(new Error(`Backup doesn't exist`));

            this._ensureCreated('folder', this.options.path);
            this._ensureCreated('file', `${this.options.path}/${this.options.name}.json`);

            this.queue.push(() => {
                const data = fs.readFileSync(`${this.options.path}/${this.options.name}--backup.json`, 'utf8');
                return JSON.parse(data.toString());
            }, (data) => {
                this.queue.push(() => {
                    fs.writeFileSync(`${this.options.path}/${this.options.name}.json`, JSON.stringify(data));
                }, () => {
                    /**
                     * Fires when the store has been restored from a backup
                     * 
                     * @event Store#restore
                     */
                    this.emit('restore');

                    resolve(true);
                });
            });
        });
    }
}
}