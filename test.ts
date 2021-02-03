import XennonStore from './src/index'
let Store = new XennonStore()

Store.add({ uwu: "owo" })
Store.all().then(r => console.log(r))
Store.on("backup", (r) => console.log("backup"))