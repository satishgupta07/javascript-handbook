// ============================================================
// CONCEPT: for...in Loop
// ============================================================
// for...in iterates over the KEYS (property names) of an object.
// It also works on arrays, giving the INDEX as the key (as a string).
//
// SYNTAX:
//   for (const key in object) { }
//
// KEY POINTS:
//   - On OBJECTS → key is the property name (string)
//   - On ARRAYS  → key is the index (string: "0", "1", "2"...)
//     Use obj[key] to get the value
//   - Does NOT work on Maps (Map is not enumerable this way)
//
// for...in vs for...of:
//   for...in  → KEYS   (use on objects)
//   for...of  → VALUES (use on arrays, strings, Maps)
// ============================================================

// for...in on an object — iterates property names (keys)
const myObject = {
    js: 'javascript',
    cpp: 'C++',
    rb: "ruby",
    swift: "swift by apple"
}

for (const key in myObject) {
    //console.log(`${key} shortcut is for ${myObject[key]}`);
    // key = "js", myObject[key] = "javascript"
    // key = "cpp", myObject[key] = "C++"  ... etc.
}


// for...in on an array — key is the INDEX (as a string)
const programming = ["js", "rb", "py", "java", "cpp"]

for (const key in programming) {
    console.log(programming[key]);  // key is "0","1","2"... use it to access value
}


// for...in does NOT work on Maps
// Map is not a plain enumerable object — for...in yields nothing useful
// const map = new Map()
// map.set('IN', "India")
// map.set('USA', "United States of America")
// map.set('Fr', "France")
// map.set('IN', "India")

// for (const key in map) {
//     console.log(key);   // prints nothing — Map entries are not enumerable properties
// }
// → Use for...of with destructuring to iterate a Map (see three.js)
