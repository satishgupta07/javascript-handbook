// ============================================================
// CONCEPT: Strings & String Methods
// ============================================================
// Strings can be created two ways:
//   1. Primitive:    const name = "hitesh"   (most common)
//   2. Object:       const name = new String("hitesh")  (rarely used)
//
// Template literals (backticks `) allow:
//   - Embedded expressions:  `Hello ${name}`
//   - Multi-line strings
//
// Strings are IMMUTABLE — methods return NEW strings, never modify original.
//
// Common string methods:
//   .charAt(index)         → character at position
//   .indexOf(str)          → first position of str (-1 if not found)
//   .substring(start, end) → extract slice (no negatives)
//   .slice(start, end)     → extract slice (supports negative index)
//   .trim()                → remove leading/trailing whitespace
//   .replace(old, new)     → replace first occurrence
//   .includes(str)         → boolean: does string contain str?
//   .split(delimiter)      → split into array
// ============================================================

const name = "hitesh"
const repoCount = 50

// Old-style concatenation (avoid):
// console.log(name + repoCount + " Value");

// Template literal — cleaner and supports any expression inside ${}
console.log(`Hello my name is ${name} and my repo count is ${repoCount}`);

// Creating a String object (wraps the primitive — has same methods)
const gameName = new String('hitesh-hc-com')

// console.log(gameName[0]);         // "h" — strings are array-like (index access)
// console.log(gameName.__proto__);  // shows String prototype methods

// console.log(gameName.length);     // 13
// console.log(gameName.toUpperCase()); // "HITESH-HC-COM"

console.log(gameName.charAt(2));    // "t" — character at index 2
console.log(gameName.indexOf('t')); // 2   — first index where 't' appears

// substring(start, end) — extracts from start up to (not including) end
const newString = gameName.substring(0, 4)
console.log(newString);             // "hite"

// slice(start, end) — like substring but supports negative indices
// negative index counts from the END of the string
const anotherString = gameName.slice(-8, 4)
console.log(anotherString);         // "" — start (-8=5) is after end (4), returns empty

const newStringOne = "   hitesh    "
console.log(newStringOne);          // "   hitesh    "
console.log(newStringOne.trim());   // "hitesh" — removes whitespace from both ends

// replace — swaps first match of a substring
const url = "https://hitesh.com/hitesh%20choudhary"
console.log(url.replace('%20', '-'))   // replaces %20 with -

// includes — returns true/false
console.log(url.includes('sundar'))    // false — 'sundar' is not in the url

// split — converts string into an array using the delimiter
console.log(gameName.split('-'));      // ["hitesh", "hc", "com"]
