// ============================================================
// CONCEPT: for...of Loop
// ============================================================
// for...of iterates over the VALUES of any ITERABLE object.
// Iterables include: Array, String, Map, Set, NodeList, etc.
//
// SYNTAX:
//   for (const item of iterable) { }
//
// KEY POINTS:
//   - You get each VALUE directly (not the index)
//   - Works on strings (each character), arrays, Maps, Sets
//   - Does NOT work on plain objects {} (they are not iterable)
//     → Use for...in for objects (see four.js)
//
// MAP vs OBJECT:
//   Map  → iterable (for...of works), keys can be any type
//   Object → NOT directly iterable (for...of fails)
// ============================================================

// for...of on arrays
const arr = [1, 2, 3, 4, 5]

for (const num of arr) {
    //console.log(num);  // 1, 2, 3, 4, 5
}

// for...of on strings — iterates character by character
const greetings = "HelloWorld!"
for (const greet of greetings) {
    //console.log(`Each char is ${greet}`)  // H, e, l, l, o, W, o, r, l, d, !
}


// ============================================================
// Map — a key-value data structure that IS iterable
// ============================================================
// Map vs Object:
//   Object keys are always strings/symbols
//   Map keys can be ANY type (objects, numbers, etc.)
//   Map preserves insertion order
//   Map is directly iterable with for...of

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('Fr', "France")
map.set('IN', "India")    // duplicate key — overwrites, Map has no duplicates

//console.log(map);  // Map(3) { 'IN' => 'India', 'USA' => 'United States of America', 'Fr' => 'France' }

// Destructuring [key, value] in for...of on a Map
for (const [key, value] of map) {
    //console.log(key, ':-', value)   // IN :- India, USA :- ..., Fr :- France
}


// ============================================================
// Plain objects are NOT iterable — for...of FAILS on them
// ============================================================
const myObject = {
    'game1': 'NFS',
    'game2': 'Spiderman'
}

// for (const [key, value] of myObject) {    // ❌ TypeError: myObject is not iterable
//     console.log(key, ':-', value)
// }
// → Use for...in to iterate over object keys instead (see four.js)
