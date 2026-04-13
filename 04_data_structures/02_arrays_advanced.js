// ============================================================
// CONCEPT: Arrays — Advanced Methods
// ============================================================
//
// MERGING ARRAYS:
//   .concat(arr)          → merges into new array (does not mutate)
//   spread [...a, ...b]   → preferred modern way to merge/clone arrays
//
// FLATTENING NESTED ARRAYS:
//   .flat(depth)          → flattens nested arrays
//   .flat(Infinity)       → flattens ALL levels of nesting
//
// ARRAY UTILITY METHODS:
//   Array.isArray(val)    → returns true if val is an array
//   Array.from(iterable)  → creates array from any iterable (string, Map, etc.)
//                           returns [] for plain objects (not iterable)
//   Array.of(a, b, c)     → creates array from individual arguments
// ============================================================

const marvel_heros = ["thor", "Ironman", "spiderman"]
const dc_heros = ["superman", "flash", "batman"]

// Pushing an array INTO another makes a nested array (usually NOT what you want)
// marvel_heros.push(dc_heros)
// console.log(marvel_heros);      // ["thor", "Ironman", "spiderman", ["superman", "flash", "batman"]]
// console.log(marvel_heros[3][1]); // "flash" — accessing the nested array

// .concat() — combines arrays into a new one, does not mutate originals
// const allHeros = marvel_heros.concat(dc_heros)
// console.log(allHeros);  // ["thor", "Ironman", "spiderman", "superman", "flash", "batman"]

// Spread operator — modern, preferred way to merge arrays
const all_new_heros = [...marvel_heros, ...dc_heros]
console.log(all_new_heros);  // ["thor", "Ironman", "spiderman", "superman", "flash", "batman"]

// ============================================================
// .flat(depth) — flattening nested arrays
// flat(1) flattens one level, flat(Infinity) flattens completely
// ============================================================
const another_array = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4, 5]]]

const real_another_array = another_array.flat(Infinity)
console.log(real_another_array);  // [1, 2, 3, 4, 5, 6, 7, 6, 7, 4, 5] — fully flat


// ============================================================
// Array Utility Methods
// ============================================================

// Array.isArray — checks if a value is an array
console.log(Array.isArray("Hitesh"))   // false — string is not an array

// Array.from — converts an iterable/array-like to an array
console.log(Array.from("Hitesh"))              // ["H","i","t","e","s","h"] — string chars
console.log(Array.from({name: "hitesh"}))      // [] — plain objects are NOT iterable
// NOTE: plain objects without Symbol.iterator return an empty array

// Array.of — creates an array from individual values (unlike new Array(n) which sets length)
let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1, score2, score3));  // [100, 200, 300]
