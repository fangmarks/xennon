/// <reference types="node" />
import * as TimeQueue from "timequeue";
import * as EventEmitter from "events";
export default class XennonStore extends EventEmitter.EventEmitter {
    private backups;
    private op;
    options: any;
    worker: (action: any, callback?: any) => void;
    queue: TimeQueue;
    backupInterval: any;
    constructor(options?: {
        name?: string;
        path?: string;
        backups?: {
            enabled?: boolean;
            interval?: string;
        };
    });
    /**
       * Adds a new object to the store
       * @param {Object | Array<Object>} vals An object or an array of objects to add to the store
       * @returns {String | Array<String>} The ID of the item added, or an array of IDs belonging to the items added
       * @fires Store#added
       *
       * @example <caption>Add a single item</caption>
       * Store.add({ my: 'item' })
       * @example <caption>Add multiple items</caption>
       * Store.add([
       *  { item: '1' },
       *  { item: '2' }
       * ])
       */
    add(vals: any): Promise<unknown>;
    /**
       * Get an item from the store
       * @param {String} id The ID of the item to get from the store
       * @returns {Object | undefined} The item that belongs to that ID, or undefined if none is found
       *
       * @example <caption>Get an item using it's ID</caption>
       * Store.get('2xuxhuoyd5h5563v')
       */
    get(id: any): Promise<unknown>;
    /**
       * Indicates if a specific item how many items exist that match a provided filter
       * @param {Object | String} filter Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @returns {Promise<Boolean | Array<[]>} Either a boolean indicating if an item is found, or an Array of the Items found
       *
       * @example <caption>Check if an item exists using a filter object</caption>
       * Store.has({ myProp: 'myVal' })
       *
       * @example <caption>Check if an item exists using an item's ID</caption>
       * Store.has('2xuxhuoyd5h5563v')
       */
    has(filter: any): Promise<unknown>;
    /**
       * Ensures an item in the store exists, adding it if it doesn't
       * @param {Object | Function | String} filter Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @param {Object} item The item to add to the store, if it doesn't exist
       * @returns {Promise<Boolean | String>} Returns either `true` if something matching the Filter exists, returns a string with the ID if `item` didn't exist
       * @fires Store#added
       *
       * @example <caption>Ensure an item exists using a filter object</caption>
       * Store.ensure({ myProp: 'myVal' }, { myProp: 'myVal' })
       *
       * @example <caption>Ensure an item exists using an item's ID</caption>
       * Store.ensure('2xuxhuoyd5h5563v', { myProp: 'myVal'})
       * @example <caption>Ensure an item exists using a Function</caption>
       * Store.ensure((s) => s.myProp === 'myVal', { myProp: 'myVal'})
       */
    ensure(filter: any, item: any): Promise<unknown>;
    /**
       * Get all items from the store
       * @returns {Promise<Object[]>} An array of items in the store
       *
       * @example <caption>Get all items from the store as an array of objects</caption>
       * Store.all()
       */
    all(): Promise<Object[]>;
    /**
       * Get all items from the store, in raw object (key- > value) form
       * @returns {Object} An object of items in the store
       *
       * @example <caption>Get all items from the store as a ID mapped object</caption>
       * Store.object()
       */
    object(): Promise<unknown>;
    /**
       * Get all items from the store that match an object (key -> value) filter
       * @param {Object} obj An object containing the keys/values to filter by
       * @param {FilterOptions} [opts] The options for the filter
       * @returns {Array<Object>} An array of items in the store that matched the filter
       *
       * @example <caption>Get all items from the store that match a filter object</caption>
       * Store.only({ myProp: 'myVal' })
       */
    only(obj: any, opts?: {
        strict: boolean;
    }): Promise<unknown>;
    /**
       * Get all items from the store that match a function filter
       * @param {Function} func A function that returns a truthy value for items that match the filter
       * @returns {Array<Object>} An array of items in the store that matched the filter
       *
       * @example <caption>Get all items from the store that match a filter function</caption>
       * Store.filter((item) => item.myProp === 'myVal')
       */
    filter(func: any): Promise<unknown>;
    /**
       * Filters all items from the store that match a function filter, but only returns the first match
       * @param {Function} func A function that returns a truthy value for the item that matches the filter
       * @returns {Object | undefined} The item itself, or undefined if the item doesn't exist
       *
       * @example <caption>Get the first item from the store that matchs a filter function</caption>
       * Store.first((item) => item.myProp === 'myVal')
       */
    first(func: any): Promise<unknown>;
    /**
       * Edit an item in the store
       * @param {Function | Object | String} key Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @param {Object} newValues An object of keys/values to add, edit or remove to/from the item
       * @returns {Boolean | undefined} A boolean indicating the result of the action, or undefined if the item doesn't exist
       * @fires Store#edited
       *
       * @example <caption>Edit an item using a filter object</caption>
       * Store.edit({ myProp: 'myVal' }, { myProp: 'myNewVal', myNewVal: 'anotherNewVal' })
       *
       * @example <caption>Edit an item using an item's ID</caption>
       * Store.edit('2xuxhuoyd5h5563v', { myProp: 'myNewVal', myNewVal: 'anotherNewVal' })
       */
    edit(key: any, newValues: any): Promise<unknown>;
    /**
       * A combination function that edits an existing item, or adds a new item if it doesn't exist in the store
       * @param {Function | Object | String} key Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @param {Object} newValues An object of keys/values to add, edit or remove to/from the item. If the item doesn't exist and is added, only keys with a truthy value are added.
       * @returns {Boolean | undefined} A boolean indicating the result of the action
       * @fires Store#added
       * @fires Store#edited
       *
       * @example <caption>Upsert an item using a filter object</caption>
       * Store.upsert({ myProp: 'myVal' }, { myProp: 'myVal', myNewVal: 'anotherNewVal' })
       *
       * @example <caption>Edit an item using an item's ID</caption>
       * Store.upsert('2xuxhuoyd5h5563v', { myProp: 'myVal', myNewVal: 'anotherNewVal' })
       */
    upsert(key: any, newValues: any): Promise<unknown>;
    /**
       * Replace an item in the store entirely
       * @param {Function | Object | String} key Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @param {Object} value The new object to replace the existing item in the store with
       * @returns {Boolean | undefined} A boolean indicating the result of the action, or undefined if the item doesn't exist
       * @fires Store#replaced
       *
       * @example <caption>Replace an item using a filter object</caption>
       * Store.replace({ myProp: 'myVal' }, { myNewestProp: 'myNewestVal' })
       *
       * @example <caption>Edit an item using an item's ID</caption>
       * Store.replace('2xuxhuoyd5h5563v', { myNewestProp: 'myNewestVal' })
       */
    replace(key: any, value: any): Promise<unknown>;
    /**
       * Iterates ofer all items in the store and deletes items that match a filter provided
       * @param {Function | Object} filter Either an object containing the keys/values to filter by, or a filter function that returns a truthy value
       * @returns {Number} A number indicating how many items were deleted from the store
       *
       * @example <caption>Sweep the store using a filter object</caption>
       * Store.sweep({ myProp: 'myVal' })
       */
    sweep(filter: any): Promise<unknown>;
    /**
       * Delete an item from the store
       * @param {Function | Object | String} key Either an object containing the keys/values to find by, a filter function that returns a truthy value, or the item's ID
       * @returns {Boolean | undefined} A boolean indicating the result of the action, or undefined if the item doesn't exist
       * @fires Store#deleted
       *
       * @example <caption>Delete an item using a filter object</caption>
       * Store.delete({ myProp: 'myVal' })
       *
       * @example <caption>Delete an item using an item's ID</caption>
       * Store.delete('2xuxhuoyd5h5563v')
       */
    delete(key: any): Promise<unknown>;
    /**
       * Deletes all items from the store
       * @returns {Boolean} A boolean indicating the result of the action
       * @fires Store#emptied
       *
       * @example <caption>Empty the store</caption>
       * Store.empty()
       */
    empty(): Promise<unknown>;
    /**
       * Ensure a directory or file has been created and exists
       * @private
       * @param {'file' | 'folder'} type The type to ensure exists
       * @param {String} dir The full path or full path and filename to ensure exists
       * @returns {Boolean} A boolean indicating the result of the action
       *
       * @example <caption>Ensure the data directory exists</caption>
       * Store._ensureCreated('folder', this.options.path)
       */
    _ensureCreated(type: any, dir: any): boolean;
    /**
       * Helper to check if a variable is an object
       * @param {*} obj Any variable to check
       * @returns {Boolean} A boolean indicating whether the variable is an object or not
       *
       * @example <caption>Check if a variable is an object</caption>
       * Store._isObject(['array'])
       */
    _isObject(obj: any): boolean;
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
    _get(filter: any): Promise<unknown>;
    /**
       * Start the scheduled backups, using the store's backupInterval option
       * @returns {Boolean} A boolean indicating the result of the action
       * @fires Store#backupsStarted
       *
       * @example <caption>Start scheduled backups</caption>
       * Store.startBackups()
       */
    startBackups(): Promise<unknown>;
    /**
       * Stop the scheduled backups
       * @returns {Boolean} A boolean indicating the result of the action
       * @fires Store#backupsStopped
       *
       * @example <caption>Stop scheduled backups</caption>
       * Store.stopBackups()
       */
    stopBackups(): Promise<unknown>;
    /**
       * Create a backup of the store
       * @param {Boolean} [scheduled=false] A boolean indicating whether the backup is made by the scheduled backup interval or manually
       * @returns {Boolean} A boolean indicating the result of the action
       * @fires Store#backup
       *
       * @example <caption>Make a backup of the store</caption>
       * Store.backup()
       */
    backup(scheduled?: boolean): Promise<unknown>;
    /**
       * Replace the store's contents with the contents of an earlier or previous backup
       * @returns {Boolean} A boolean indicating the result of the action
       * @fires Store#restore
       *
       * @example <caption>Restore the store from backup</caption>
       * Store.restore()
       */
    restore(): Promise<unknown>;
    /**
       * Listen to Xennon Events
       * @param {"added"|"edited"|"replaced"|"deleted"|"emptied"|"backupsStarted"|"backupsStopped"|"backup"|"restore"|} value
       */
    on(value: any, func: any): void;
}
