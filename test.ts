import XennonStore from "./build/index";

let Store = new XennonStore();

//Store.all().then(r => console.log("All Items", r))
Store.on("backup", (r) => console.log("Backed up the Store"));
Store.on("added", (r) => console.log("Data was Added", r));


Store.has('a').then(r => console.log("STRING", r)).catch(error => console.error("STRING ERROR", error))
Store.has({ "count": 30 }).then(r => console.log("OBJECT", r)).catch(error => console.error("OBJECT ERROR", error))
// Store.ensure({ article: "Test Object" }, { article: "Test Object" }).then(r => console.log(r))
// Store.ensure('TESTINGITEM', { article: "Testing Item", count: 666 }).then(r => console.log("ENSURE ID RETURN", r))
//Store.ensure((s) => s.id === "TESTING", { article: "TESTING", count: 621 }).then(r => console.log("ENSURE FUNCTION RETURN", r))
