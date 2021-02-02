## XENNON
Xennon is a extended version of [Store], rewritten entirely in Typescript 

# THIS IS NOT YET FINISHED


## Features
- Simple, powerful data management and filtering
- ES6 and Promises, callbacks be gone
- Built in Backup and Restore
- Scheduled Backups
- read/write queuing to prevent data loss

## Install
Installing Xennon is as easy as running
```
npm i xennon
```
or the equivalent command within Yarn or PNPM

## Example

```ts
import XennonStore from 'xennon'
const Store = new XennonStore()

await Store.add({
    lion: '🦁'
}) // => 'gf34sezvoh6'

Store.find({lion: '🦁'})
// => {lion: '🦁', _id: 'gf34sezvoh6'}

Store.edit('gf34sezvoh6',{
    lion: '🐺'
})

Store.delete('gf34sezvoh6')
// => true
```
You can see more of what Xennon can do in the [Documentation]

[Store]: https://github.com/thattonybo/store
[Documentation]: https://wrwlf.de/XennonDocs