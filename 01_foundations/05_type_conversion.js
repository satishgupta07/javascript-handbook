// ============================================================
// CONCEPT: Type Conversion & Operations
// ============================================================
// JavaScript is dynamically typed — types are converted
// automatically (implicit) or manually (explicit).
//
// EXPLICIT CONVERSION with built-in functions:
//   Number(value)  → converts to number
//   Boolean(value) → converts to boolean
//   String(value)  → converts to string
//
// Key conversion rules:
//   "33"    → Number → 33
//   "33abc" → Number → NaN  (Not a Number — invalid conversion)
//   true    → Number → 1  |  false → Number → 0
//   1       → Boolean → true  |  0 → Boolean → false
//   ""      → Boolean → false  |  "anytext" → Boolean → true
// ============================================================

let score = "33"

console.log(typeof score);          // "string"
console.log(typeof(score));         // same — typeof works with or without parens

let valueInNumber = Number(score)   // explicit string → number conversion
console.log(typeof valueInNumber);  // "number"
console.log(valueInNumber);         // 33

// "33" => 33       ✅ valid number string
// "33abc" => NaN   ❌ can't parse letters
//  true => 1; false => 0

let isLoggedIn = "satish"

let booleanIsLoggedIn = Boolean(isLoggedIn)  // non-empty string → true
console.log(booleanIsLoggedIn);

// Boolean conversion rules:
// 1 => true; 0 => false
// "" => false  (empty string is falsy)
// "hitesh" => true  (non-empty string is truthy)

let someNumber = 33

let stringNumber = String(someNumber)   // number → string
console.log(stringNumber);             // "33"
console.log(typeof stringNumber);      // "string"

// ============================================================
// CONCEPT: Arithmetic Operations
// ============================================================
// Standard operators: +  -  *  /  %  **
//   **  = exponentiation  (2**3 = 8)
//   %   = modulo/remainder
// ============================================================

let value = 3
let negValue = -value   // unary negation
console.log(negValue);  // -3

console.log(2+2);   // 4
console.log(2-2);   // 0
console.log(2*2);   // 4
console.log(2**3);  // 8  (2 to the power 3)
console.log(2/3);   // 0.666...
console.log(2%3);   // 2  (remainder)

// ============================================================
// CONCEPT: String Concatenation with +
// ============================================================
// When + is used with a string, JS converts everything to string
// Evaluation is LEFT TO RIGHT — order matters!
// ============================================================

let str1 = "hello"
let str2 = "satish"

let str3 = str1 + str2       // string + string = concatenation
console.log(str3);           // "hellosatish"

console.log("1" + 2);        // "12"  — string + number = string
console.log(1 + "2");        // "12"  — number + string = string
console.log("1" + 2 + 2);   // "122" — left to right: "1"+2="12", then "12"+2="122"
console.log(1 + 2 + "2");   // "32"  — left to right: 1+2=3 (number), then 3+"2"="32"

// Unary + converts operand to number
console.log(+true);   // 1
console.log(+"");     // 0

// ============================================================
// CONCEPT: Increment Operators
// ============================================================
// gameCounter++ (post-increment): returns current value THEN increments
// ++gameCounter (pre-increment):  increments FIRST, then returns new value
// ============================================================

let gameCounter = 100
console.log(gameCounter++);  // 100 — returns 100, THEN increments to 101
console.log(++gameCounter);  // 102 — increments to 102 FIRST, then returns 102

// Reference: https://tc39.es/ecma262/multipage/abstract-operations.html#sec-type-conversion
