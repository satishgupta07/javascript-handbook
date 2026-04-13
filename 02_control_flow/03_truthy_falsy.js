// ============================================================
// CONCEPT: Truthy & Falsy Values
// ============================================================
// Every value in JS is either truthy or falsy when evaluated
// in a boolean context (like an if condition).
//
// FALSY values (evaluate to false):
//   false, 0, -0, 0n (BigInt zero), "" (empty string),
//   null, undefined, NaN
//
// TRUTHY values (everything else, including):
//   "0"  (non-empty string)   'false'  (non-empty string)
//   " "  (whitespace string)  []       (empty array — truthy!)
//   {}   (empty object — truthy!)      function(){}
//
// COMMON GOTCHA: [] and {} are truthy, even though they're "empty"
// To check if array is empty:  arr.length === 0
// To check if object is empty: Object.keys(obj).length === 0
// ============================================================

const userEmail = []   // empty array — truthy!

if (userEmail) {
    console.log("Got user email");  // ← this runs ([] is truthy)
} else {
    console.log("Don't have user email");
}

// falsy values
// false, 0, -0, BigInt 0n, "", null, undefined, NaN

// truthy values
// "0", 'false', " ", [], {}, function(){}

// Correct way to check if array is empty:
// if (userEmail.length === 0) {
//     console.log("Array is empty");
// }

const emptyObj = {}

// Correct way to check if object is empty:
if (Object.keys(emptyObj).length === 0) {
    console.log("Object is empty");  // ← this runs
}


// ============================================================
// CONCEPT: Nullish Coalescing Operator (??)
// ============================================================
// ?? returns the RIGHT side only when the LEFT side is
// null or undefined (NOT for 0 or "" like || does).
//
// Use ?? when you want a fallback only for null/undefined,
// and want to keep 0 or "" as valid values.
//
// val ?? fallback
//   → if val is null or undefined → returns fallback
//   → otherwise                   → returns val
// ============================================================

let val1;
// val1 = 5 ?? 10          // 5     — left is defined, return left
// val1 = null ?? 10       // 10    — left is null, return right
// val1 = undefined ?? 15  // 15    — left is undefined, return right
val1 = null ?? 10 ?? 20    // 10   — first non-null/undefined wins

console.log(val1);  // 10


// ============================================================
// CONCEPT: Ternary Operator
// ============================================================
// Compact if/else for simple conditions.
// condition ? valueIfTrue : valueIfFalse
// ============================================================

const iceTeaPrice = 100
iceTeaPrice <= 80
    ? console.log("less than 80")   // false
    : console.log("more than 80")   // ← this runs
