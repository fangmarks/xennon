declare namespace XennonStore {

    interface DefaultStoreOptions {
        /**
         * The Name of Xennon's Data Collection.
         * Use a Different name per Collection to keep your data separate
         */
        name?: string
        /**
         * The full path to indicate where to store the .json Data File
         * @default path: process.cwd() + "/XennonStore"
         */
        path?: string
        /**
         * Backup Options
         */
        backups?: {
            /**
             * Wether to enable scheduled backups of your XennonStore or not
             */
            enabled?: boolean,
            /**
             * the interval you want the scheduled backup to run at
             * 
             * see the [ms](https://npm.im/ms) for help on how to structure this
             * @default interval: "1 hour" 
             */
            interval: string
        }

    }

    //    interface options extends DefaultStoreOptions { }

    interface DefaultFilterOptions {
        strict: boolean
    }

}


export default XennonStore