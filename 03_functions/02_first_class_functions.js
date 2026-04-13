/*
  CONCEPT: First Class Functions & Function Types in JavaScript
  ============================================================
  "Functions are heart of JavaScript." — Akshay Saini

  In JavaScript, functions are FIRST CLASS CITIZENS — they can be:
    1. Assigned to variables
    2. Passed as arguments to other functions
    3. Returned from other functions

  This makes functions just like any other value (number, string, etc.)
  and enables the functional programming patterns in this repo.

  TYPES OF FUNCTIONS (all slightly different):
    - Function Statement (= Function Declaration)
    - Function Expression
    - Anonymous Function
    - Named Function Expression
    - Arrow Function
    - IIFE (Immediately Invoked Function Expression)
  ============================================================
*/

// ─── 1. Function Statement (= Function Declaration) ──────────
// Classic syntax. FULLY HOISTED — callable before it appears in code.
function greet() {
    console.log("Hello from function statement!");
}
greet();  // "Hello from function statement!"

// ─── 2. Function Expression ──────────────────────────────────
// A function assigned as a value to a variable.
// The VARIABLE is hoisted (as undefined), but the FUNCTION is NOT.
var sayHi = function() {
    console.log("Hi from function expression!");
};
sayHi();  // "Hi from function expression!"

// ─── 3. The critical hoisting difference ─────────────────────
/*
  BEFORE their respective lines:
    greet()  → works! (function statement — fully hoisted)
    sayHi()  → TypeError: sayHi is not a function (var hoisted as undefined)
*/
// Illustrated:
console.log(typeof greet);   // "function"  — fully in memory from start
// console.log(typeof sayBye); // "undefined" — only var hoisted, not the function
var sayBye = function() { console.log("Bye!"); };

// ─── 4. Anonymous Function ────────────────────────────────────
// A function with NO name. Cannot stand alone — needs to be used as a value.
// function() { }  // SyntaxError: Function statements require a function name

// Anonymous functions are used as values:
const nums = [1, 2, 3];
nums.forEach(function(n) {       // ← anonymous function as callback
    console.log(n);
});

setTimeout(function() {          // ← anonymous function as callback
    console.log("Timer done!");
}, 1000);

// ─── 5. Named Function Expression ────────────────────────────
// Like function expression, but the function has an internal name.
// The name is ONLY accessible inside the function itself (for recursion).
var factorial = function computeFactorial(n) {
    if (n <= 1) return 1;
    return n * computeFactorial(n - 1);  // can use name internally
};

console.log(factorial(5));       // 120
// console.log(computeFactorial);  // ReferenceError — not accessible outside

// Benefit over anonymous: better stack traces in debugging
var multiply = function multiplyTwo(a, b) {
    return a * b;
};
console.log(multiply(3, 4));  // 12

// ─── 6. Parameters vs Arguments ──────────────────────────────
function add(param1, param2) {   // param1, param2 are PARAMETERS (labels)
    return param1 + param2;
}
console.log(add(5, 10));         // 5 and 10 are ARGUMENTS (actual values)

// ─── 7. First Class Functions — passing functions as arguments ─
// Functions can be passed to other functions exactly like values.
function execute(fn, value) {
    return fn(value);
}

const double = x => x * 2;
const square = x => x * x;

console.log(execute(double, 5));  // 10
console.log(execute(square, 5));  // 25

// The anonymous function form:
console.log(execute(function(x) { return x + 100; }, 5));  // 105

// ─── 8. First Class Functions — returning functions ───────────
// A function that creates and returns another function (factory pattern).
function makeMultiplier(factor) {
    return function(number) {   // ← returning a function
        return number * factor;
    };
}

const triple  = makeMultiplier(3);
const tenTimes = makeMultiplier(10);

console.log(triple(5));    // 15
console.log(tenTimes(7));  // 70

console.log([1, 2, 3, 4].map(triple));    // [3, 6, 9, 12]
console.log([1, 2, 3, 4].map(tenTimes));  // [10, 20, 30, 40]

// ─── 9. Functions stored in data structures ───────────────────
// Because functions are values, they can go anywhere a value can go.
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
};

console.log(operations.add(5, 3));       // 8
console.log(operations.multiply(4, 6));  // 24

const transforms = [
    x => x * 2,
    x => x + 10,
    x => x ** 2,
];
console.log(transforms[0](5));   // 10
console.log(transforms[1](5));   // 15
console.log(transforms[2](5));   // 25

// ─── 10. Summary: which type to use when ─────────────────────
/*
  Type                      | Hoisted? | When to use
  ──────────────────────────|──────────|─────────────────────────────────
  Function Statement        |  Yes     | Top-level, named utility functions
  Function Expression (var) |  No      | When order matters; store in variable
  Function Expression (const)|  No     | Modern default — prevents accidental reassign
  Arrow Function            |  No      | Callbacks, no 'this' binding needed
  Named Function Expression |  No      | Recursive functions, better debug traces
  Anonymous Function        |  No      | Short inline callbacks (forEach, setTimeout)
*/
