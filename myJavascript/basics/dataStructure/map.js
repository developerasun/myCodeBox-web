const myMap = new Map()

const myLog = (any) => {
    console.log(any)
}

console.log(myMap.size) // 0
// JS map takes any type of key/value
myMap.set("firstname", "jake")
myMap.set("firstname2", "smith")

myMap.set("lastname", "sung")
myMap.set("lastname2", "kim")

myMap.has("firstname") ? myLog("key exist") : myLog("No such key")
myLog(myMap.get("lastname2")) // kim
myMap.delete("lastname2")
myLog(myMap.get("lastname2")) // undefined