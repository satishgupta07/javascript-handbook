/*
  CONCEPT: Currying and Function Composition
  ============================================================
  Functional programming patterns that change how functions are
  written and combined. These build directly on closures
  (covered in 01_closure.js).

  CURRYING
    Transforms a function that takes multiple arguments into a
    chain of functions that each take ONE argument.

    add(2, 3)   → becomes →   add(2)(3)

    WHY:
      - Partial application — pre-supply some arguments now,
        supply the rest later
      - Create specialized functions from generic ones
      - Enable cleaner pipelines and reuse

  FUNCTION COMPOSITION
    Combining multiple functions so the output of one feeds
    directly into the next.

    compose(f, g, h)(x)  →  f(g(h(x)))   right to left
    pipe(f, g, h)(x)     →  h(g(f(x)))   left to right (more readable)

  MEMOIZATION
    Caching a function's results so repeated calls with the same
    arguments don't recompute — they return the cached value.
  ============================================================
*/

// ─── 1. Manual Currying ──────────────────────────────────────
// Normal: takes both arguments at once
function add(a, b) {
    return a + b;
}
console.log(add(2, 3));  // 5

// Curried version: returns a function waiting for the second argument
function curriedAdd(a) {
    return function(b) {
        return a + b;  // 'a' lives in closure even after curriedAdd returns
    };
}

// Arrow function shorthand (same thing):
const curriedAddArrow = a => b => a + b;

console.log(curriedAdd(2)(3));       // 5
console.log(curriedAddArrow(5)(10)); // 15

// ─── 2. Partial Application — the real-world use ─────────────
// Lock in the first argument to create a specialized function
const add5  = curriedAdd(5);    // a = 5 is now "baked in"
const add10 = curriedAdd(10);   // a = 10 is now "baked in"

console.log(add5(3));    // 8
console.log(add5(7));    // 12
console.log(add10(3));   // 13
console.log(add10(20));  // 30

// Practical: multiply
const multiply = a => b => a * b;

const double = multiply(2);  // baked-in multiplier of 2
const triple = multiply(3);  // baked-in multiplier of 3

console.log([1, 2, 3, 4, 5].map(double));  // [2, 4, 6, 8, 10]
console.log([1, 2, 3, 4, 5].map(triple));  // [3, 6, 9, 12, 15]

// ─── 3. Generic curry() utility ──────────────────────────────
// Converts ANY multi-argument function into its curried equivalent
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            // We have enough arguments — call the original function
            return fn.apply(this, args);
        }
        // Not enough yet — return a new function that collects more
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

const curriedVolume = curry((l, w, h) => l * w * h);

console.log(curriedVolume(2)(3)(4));    // 24 — one at a time
console.log(curriedVolume(2, 3)(4));    // 24 — two then one
console.log(curriedVolume(2)(3, 4));    // 24 — one then two
console.log(curriedVolume(2, 3, 4));    // 24 — all at once

// ─── 4. Function Composition ─────────────────────────────────
// compose: right to left (math notation — innermost runs first)
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// pipe: left to right (more readable in code — first function runs first)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

// Building blocks — each is a pure, single-purpose function
const trim         = str => str.trim();
const toLower      = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, "-");
const addPrefix    = str => `blog-${str}`;

// Compose a URL slug generator — each step feeds into the next
const toSlug = pipe(trim, toLower, removeSpaces, addPrefix);

console.log(toSlug("  Hello World  "));      // "blog-hello-world"
console.log(toSlug("  Chai Aur Code  "));    // "blog-chai-aur-code"
console.log(toSlug("  JavaScript Basics"));  // "blog-javascript-basics"

// ─── 5. Compose a data transformation pipeline ────────────────
const users = [
    { name: "alice", age: 17, score: 85 },
    { name: "Bob",   age: 22, score: 92 },
    { name: "carol", age: 19, score: 78 },
    { name: "Dave",  age: 16, score: 95 },
];

// Each step is a focused, testable function
const onlyAdults   = list => list.filter(u => u.age >= 18);
const highScorers  = list => list.filter(u => u.score >= 80);
const capitalized  = list => list.map(u => ({
    ...u,
    name: u.name[0].toUpperCase() + u.name.slice(1)
}));
const namesOnly    = list => list.map(u => u.name);

// Compose them — each receives the output of the previous
const getTopAdults = pipe(onlyAdults, highScorers, capitalized, namesOnly);

console.log(getTopAdults(users));  // ["Bob"]
// Alice: underage; Carol: score too low; Dave: underage; Bob: passes all

// ─── 6. Memoization ──────────────────────────────────────────
/*
  Cache a function's results keyed by its arguments.
  Subsequent calls with identical arguments return instantly.
  Best for: pure functions with expensive computation.
*/
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);  // serialize args as cache key
        if (cache.has(key)) {
            return cache.get(key);  // cache hit
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Fibonacci without memoization is exponentially slow for large n
const fib = memoize(function(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

console.log(fib(10));  // 55     — computed
console.log(fib(40));  // 102334155 — fast because intermediate values cached
console.log(fib(10));  // 55     — instant (from cache)

// Memoize any expensive pure function
const expensiveCalc = memoize((x, y) => {
    // simulate heavy work
    return x * y + Math.sqrt(x + y);
});

console.log(expensiveCalc(100, 200));  // computed
console.log(expensiveCalc(100, 200));  // from cache

// ─── 7. Summary: Currying vs Partial Application ─────────────
/*
  Currying:
    Always produces unary (single-argument) functions.
    add(2, 3)  →  add(2)(3)

  Partial Application:
    Pre-fills SOME arguments, producing a function with fewer params.
    add(2, 3)  →  addTwo(3)  where addTwo = add.bind(null, 2)

  They solve the same problem in slightly different ways.
  In practice, currying is what you write by hand;
  partial application is often done with .bind() or curry().
*/
