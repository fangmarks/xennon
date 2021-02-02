import TimeQueue from 'timequeue'
import EventEmiiter from 'events'
import { uid } from 'uid'
import XennonTypes from "./types";

const DefaultStoreOptions: XennonTypes.DefaultStoreOptions = {
    name: 'store',
    path: process.cwd() + '/XennonStore',
    backups: {
        enabled: true,
        interval: '1 hour'
    }
}

export default class XennonStore extends EventEmiiter.EventEmitter {

}