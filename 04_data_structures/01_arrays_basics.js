// ============================================================
// CONCEPT: Arrays — Basics & Mutation Methods
// ============================================================
// An array is an ordered, indexed collection of values.
// Arrays in JS are dynamic (grow/shrink), zero-indexed,
// and can hold mixed types.
//
// Creation:
//   const arr = [1, 2, 3]          ← array literal (preferred)
//   const arr = new Array(1, 2, 3) ← constructor syntax
//
// MUTATION METHODS (modify the original array):
//   .push(val)    → add to END             returns new length
//   .pop()        → remove from END        returns removed element
//   .unshift(val) → add to BEGINNING       returns new length
//   .shift()      → remove from BEGINNING  returns removed element
//
// SEARCH METHODS:
//   .includes(val) → returns true/false
//   .indexOf(val)  → returns index or -1
//
// JOIN:
//   .join(sep)     → joins elements into a string (default sep is comma)
//
// SLICE vs SPLICE — easy to confuse:
//   .slice(start, end)       → returns NEW array, does NOT modify original
//   .splice(start, count)    → MODIFIES original, removes & returns elements
// ============================================================

// Array creation
const myArr = [0, 1, 2, 3, 4, 5]
const myHeors = ["shaktiman", "naagraj"]

const myArr2 = new Array(1, 2, 3, 4)  // constructor syntax
// console.log(myArr[1]);               // 1 — access by index

// --- Mutation methods (commented — uncomment to try) ---
// myArr.push(6)    // [0,1,2,3,4,5,6]  — adds 6 at end
// myArr.push(7)    // [0,1,2,3,4,5,6,7]
// myArr.pop()      // [0,1,2,3,4,5,6]  — removes last

// myArr.unshift(9) // [9,0,1,2,3,4,5]  — adds 9 at start
// myArr.shift()    // [0,1,2,3,4,5]    — removes first

// console.log(myArr.includes(9));  // false
// console.log(myArr.indexOf(3));   // 3

// const newArr = myArr.join()      // "0,1,2,3,4,5" (comma separated string)
// console.log(myArr);
// console.log(newArr);


// ============================================================
// slice vs splice — IMPORTANT DIFFERENCE
// ============================================================

console.log("A ", myArr);       // original: [0, 1, 2, 3, 4, 5]

// slice(start, end) — returns a NEW array from index 1 up to (not including) 3
// does NOT change the original array
const myn1 = myArr.slice(1, 3)
console.log(myn1);              // [1, 2]
console.log("B ", myArr);       // still [0, 1, 2, 3, 4, 5] — UNCHANGED

// splice(start, deleteCount) — REMOVES elements from the original array
// returns the removed elements as a new array
const myn2 = myArr.splice(1, 3)
console.log(myn2);              // [1, 2, 3] — removed elements
console.log("C ", myArr);       // [0, 4, 5] — ORIGINAL IS NOW SHORTER
