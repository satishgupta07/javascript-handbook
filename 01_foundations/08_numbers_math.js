// ============================================================
// CONCEPT: Numbers & the Math Object
// ============================================================
// JavaScript has ONE number type for both integers and decimals.
//
// Number methods (called on a number value):
//   .toString()           → converts number to string
//   .toFixed(n)           → rounds to n decimal places (returns string)
//   .toPrecision(n)       → formats to n significant digits (returns string)
//   .toLocaleString(locale) → formats with locale-specific separators
//
// Math object — built-in math utilities:
//   Math.abs(x)           → absolute value
//   Math.round(x)         → round to nearest integer
//   Math.ceil(x)          → round UP (ceiling)
//   Math.floor(x)         → round DOWN (floor)
//   Math.min(a, b, ...)   → smallest value
//   Math.max(a, b, ...)   → largest value
//   Math.random()         → random float between 0 (inclusive) and 1 (exclusive)
//
// RANDOM NUMBER IN A RANGE formula:
//   Math.floor(Math.random() * (max - min + 1)) + min
// ============================================================

const score = 400
// console.log(score);

const balance = new Number(100)
// console.log(balance);

// console.log(balance.toString().length);  // "100".length = 3
// console.log(balance.toFixed(1));         // "100.0" — 1 decimal place

const otherNumber = 123.8966
// console.log(otherNumber.toPrecision(4)); // "123.9" — 4 significant digits

const hundreds = 1000000
// console.log(hundreds.toLocaleString('en-IN')); // "10,00,000" — Indian formatting

// ++++++++++++++ Math object +++++++++++++++++++++++++++++
// console.log(Math);            // logs the Math object with all methods
// console.log(Math.abs(-4));    // 4   — removes negative sign
// console.log(Math.round(4.6)); // 5   — rounds to nearest
// console.log(Math.ceil(4.2));  // 5   — always rounds UP
// console.log(Math.floor(4.9)); // 4   — always rounds DOWN
// console.log(Math.min(4, 3, 6, 8)); // 3
// console.log(Math.max(4, 3, 6, 8)); // 8

// Math.random() returns a float: 0 ≤ x < 1
console.log(Math.random());              // e.g. 0.573...

// Scale to 0–9 range, then add 1 for 1–10
console.log((Math.random()*10) + 1);    // float between 1 and 10.999...
console.log(Math.floor(Math.random()*10) + 1); // integer between 1 and 10

// ============================================================
// Random integer between min and max (INCLUSIVE on both ends):
//   Math.floor(Math.random() * (max - min + 1)) + min
// ============================================================
const min = 10
const max = 20

console.log(Math.floor(Math.random() * (max - min + 1)) + min)
// produces a random integer: 10, 11, 12, ... 20
