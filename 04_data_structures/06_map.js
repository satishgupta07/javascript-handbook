// ============================================================
// CONCEPT: map() — Array Transformation Method
// ============================================================
// map() creates a NEW array by applying a callback to EVERY element.
// Every element is transformed; the array length stays the same.
// The original array is NOT modified.
//
// SYNTAX:
//   const result = array.map((item) => transformation)
//
// KEY POINTS:
//   - Always returns a new array of the SAME length
//   - Each element is the return value of the callback
//   - Chainable — map().filter().map() is common
//
// map vs filter vs forEach:
//   map     → transforms every element → same-length new array
//   filter  → keeps some elements      → shorter new array
//   forEach → side effects only        → returns undefined
// ============================================================

const myNumers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Simple map — multiply each number by 10
// const newNums = myNumers.map( (num) => { return num + 10})

// ============================================================
// Method CHAINING — map, map, filter in sequence
// ============================================================
// Each method receives the result of the previous one.
// Execution is left to right.
const newNums = myNumers
                .map((num) => num * 10 )     // [10,20,30,...,100]
                .map( (num) => num + 1)       // [11,21,31,...,101]
                .filter( (num) => num >= 40)  // keep only >= 40: [41,51,61,...,101]

console.log(newNums);   // [41, 51, 61, 71, 81, 91, 101]
