# JavaScript Interview Questions — Answer Like a Pro

> A curated, **interview-focused** companion to this handbook.
> Each answer is written the way you should *speak it in an interview* — start with a crisp one-line definition, explain the "why", show a short example, then drop a senior-level insight that gets you selected.
>
> **How to use this file:** read the question, cover the answer, say it out loud. If you can deliver the **bold one-liner** + one example + the **Interview edge** note, you'll clear that question. The answers stand on their own; a few 📖 notes point to [README.md](README.md) where it has deeper theory and diagrams.

---

## How to answer ANY JavaScript question (the winning structure)

Interviewers don't just grade *what* you know — they grade *how clearly you think*. Use this 4-beat structure every time:

1. **Define in one sentence** — show you know the term precisely.
2. **Explain the why / mechanism** — show you understand the engine, not just syntax.
3. **Give a tiny example** — concrete beats abstract.
4. **Add an edge / trade-off / real-world use** — this is what separates "junior" from "hire".

> Throughout this doc, the **🎯 Interview edge** lines are the senior-level extras that confirm your selection.

---

## Table of Contents

**Part A — Foundations (warm-up questions)**
1. [`let` vs `const` vs `var`, Hoisting & TDZ](#q1)
2. [`null` vs `undefined`](#q2)
3. [`==` vs `===` and Type Coercion](#q3)
4. [Nullish Coalescing `??` vs Logical OR `||`](#q4)
5. [Mutable vs Immutable Data Structures](#q5)
6. [Shallow Copy vs Deep Copy](#q6)
7. [Spread vs Rest Syntax](#q7)

**Part B — Functions, Scope & `this`**
8. [First-Class Functions](#q8)
9. [Function Declaration vs Function Expression](#q9)
10. [`Person()` vs `new Person()` vs `function Person(){}`](#q10)
11. [`this` — Regular vs Arrow Functions](#q11)
12. [Arrow Functions in Constructors / Class Fields](#q12)
13. [Higher-Order Functions & `map`/`filter`/`reduce`](#q13)
14. [`call` vs `apply` vs `bind`](#q14)
15. [Closures (deep dive + follow-ups)](#q15)
16. [Currying, Pure vs Impure Functions](#q16)
17. [IIFE Pattern](#q17)

**Part C — Objects, Prototypes & OOP**
18. [Ways to Create Objects](#q18)
19. [Iterating Objects vs Arrays](#q19)
20. [Prototypal Inheritance](#q20)
21. [ES2025 Classes vs ES5 Constructor Functions](#q21)

**Part D — Asynchronous JavaScript**
22. [Synchronous vs Asynchronous Functions](#q22)
23. [The Event Loop (deep dive + follow-ups)](#q23)
24. [Microtask vs Macrotask Queue](#q24)
25. [Promises vs async/await](#q25)
26. [Polyfill for `Promise.all` + `Promise.allSettled`](#q26)
27. [AJAX — Pros & Cons](#q27)
28. [The `fetch` API](#q28)

**Part E — DOM, Events & the Browser**
29. [Event Bubbling vs Capturing](#q29)
30. [Event Delegation](#q30)
31. [`DOMContentLoaded` vs `window.onload`](#q31)
32. [Cookies vs sessionStorage vs localStorage](#q32)

**Part F — Advanced & Performance**
33. [WeakMap & WeakSet](#q33)
34. [Performance: De-optimization & Deleting Object Properties](#q34)
35. [Webpack & Module Bundlers](#q35)

**Part G — Coding Challenges (live-code these)**
36. [Implement `debounce` (+ throttle, real-world uses)](#q36)
37. [Method Chaining — `calculate.add(2).mul(4).subs(1).value`](#q37)
38. [Capitalize First Letter of Each Word](#q38)
39. [Print 1–10 with a 1-Second Delay](#q39)
40. [Flatten an Array (without `Array.flat`)](#q40)
41. [Currying for Infinite Sum — `sum(10)(20)(30)()`](#q41)

**Part H — Scenario / System Design**
42. [Real-Time Chat — Efficient DOM Updates Without Blocking](#q42)

> **Note on duplicates:** the original list repeated several topics. They've been **merged** here — closures (Q11 + Q18 → §15), event loop (Q2 + Q19 → §23), async/await vs promises (Q4 + Q12 → §25), debounce (Q14 + Q16 → §36), flatten array (Q28 + Q41 → §40), currying (Q22 + Q42 → §16 & §41), call/apply/bind (Q10 + Q36 → §14), and storage (Q29 + Q48 → §32).

---

# Part A — Foundations

<a id="q1"></a>
## 1. Difference between `let`, `const`, `var` + Hoisting & TDZ

**One-liner:** *"`var` is function-scoped and hoisted as `undefined`; `let` and `const` are block-scoped and hoisted into a Temporal Dead Zone, so they exist but can't be touched until their declaration line. `const` additionally can't be reassigned."*

| Keyword | Scope | Reassign? | Redeclare? | Hoisting behaviour |
|---------|-------|-----------|------------|--------------------|
| `var`   | Function | ✅ | ✅ | Hoisted, initialized to `undefined` |
| `let`   | Block | ✅ | ❌ | Hoisted to **TDZ** — `ReferenceError` if accessed early |
| `const` | Block | ❌ | ❌ | Hoisted to **TDZ**; must be initialized at declaration |

**Hoisting:** JS runs in two phases. In the *memory-creation* phase it scans the whole scope and allocates memory **before** any line executes. `var` gets `undefined`; function declarations get their full body (so you can call them before they appear). That's why this works:

```js
console.log(x)   // undefined  — var hoisted, value not yet assigned
var x = 7

greet()          // "hi" — function declaration fully hoisted
function greet() { console.log("hi") }
```

**Temporal Dead Zone (TDZ):** the gap between a `let`/`const` being hoisted and its initialization line. Accessing it there throws:

```js
console.log(a)   // ❌ ReferenceError: Cannot access 'a' before initialization
let a = 10       // ← TDZ ends here
```

**`const` only freezes the binding, not the value** — a classic trap:

```js
const arr = [1, 2]
arr.push(3)      // ✅ allowed — we mutate the object, not the binding
arr = [9]        // ❌ TypeError — reassigning the binding is not allowed
```

> 🎯 **Interview edge:** "I default to `const`, use `let` only when I must reassign, and never `var` — because `var` leaks out of `if`/`for` blocks. The TDZ is actually a *feature*: it turns silent `undefined` bugs into loud errors."

---

<a id="q2"></a>
## 2. Difference between `null` and `undefined`

**One-liner:** *"`undefined` means a variable was declared but never assigned — JS sets it for you. `null` is an intentional, developer-assigned 'empty' value."*

```js
let a               // undefined — JS hasn't been given a value
let b = null        // null — I deliberately marked it empty

typeof undefined    // "undefined"
typeof null         // "object"  ← famous historical bug in JS
```

Key behavioural differences:

```js
null == undefined    // true  — loose equality treats them as equal
null === undefined   // false — different types

let total = 5 + null       // 5    — null coerces to 0
let total2 = 5 + undefined // NaN  — undefined coerces to NaN
```

> 🎯 **Interview edge:** "Use `null` when *you* want to signal 'no value on purpose' — e.g. resetting a field. Never assign `undefined` manually; let the engine own it. And remember `typeof null === 'object'` is a 1995 bug that can never be fixed without breaking the web."

---

<a id="q3"></a>
## 3. `==` vs `===` and Type Coercion

**One-liner:** *"`===` compares value **and** type with no conversion. `==` coerces the operands to a common type first, which causes surprising results — so I always use `===`."*

```js
"2" === 2     // false — different types, no coercion
"2" == 2      // true  — "2" coerced to 2 before comparing

0 == false    // true  — false → 0
"" == false   // true  — both → 0
null == undefined   // true  (special-cased)
null == 0     // false — null only loosely equals undefined
```

**Type coercion** is JS auto-converting types. The `+` operator is the big gotcha because it doubles as string concatenation — the first string flips everything into string mode:

```js
"1" + 2 + 2   // "122"  — string mode triggered by "1"
1 + 2 + "2"   // "32"   — 1+2=3, then "3"+"2"
```

The infamous one to mention proactively:

```js
[] == ![]     // true  — ![] is false → 0, [] coerces to "" → 0, 0 == 0
NaN === NaN   // false — NaN is never equal to anything, use Number.isNaN()
```

> 🎯 **Interview edge:** "I use `===` everywhere. The only justified use of `==` is `x == null` to catch both `null` and `undefined` in one check. The deeper reason `==` is dangerous is that it follows the abstract-equality algorithm, which has non-obvious coercion steps."

---

<a id="q4"></a>
## 4. Nullish Coalescing `??` vs Logical OR `||`

**One-liner:** *"`||` falls back on any falsy value; `??` falls back **only** on `null` or `undefined`. So `??` preserves valid falsy values like `0`, `""`, and `false`."*

```js
const count = 0

count || 10    // 10  ← WRONG: 0 is a valid value but it's falsy
count ?? 10    // 0   ← CORRECT: 0 isn't null/undefined, so it's kept
```

The 8 falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`) all trigger `||`. Only `null`/`undefined` trigger `??`.

Real-world: reading config / user input where `0` or `""` are legitimate:

```js
const volume   = settings.volume ?? 50      // user can set 0
const username = input.name || "Guest"      // empty string SHOULD fall back
```

> 🎯 **Interview edge:** "Rule of thumb: use `??` for *defaults that should respect 0/empty values* (counts, prices, toggles), and `||` only when any falsy value genuinely means 'missing'. Bonus: `??=` assigns only if the target is null/undefined."

---

<a id="q5"></a>
## 5. Mutable vs Immutable Data Structures

**One-liner:** *"Primitives (string, number, boolean, etc.) are immutable — operations return new values. Objects and arrays are mutable — they can be changed in place, and because they're reference types, changes are visible through every reference."*

```js
// Immutable primitive — methods return NEW values
let s = "hello"
s.toUpperCase()   // "HELLO" — but s is still "hello"

// Mutable object — shared by reference
const a = { x: 1 }
const b = a
b.x = 99
console.log(a.x)  // 99 — a and b point to the same object
```

**Achieving immutability** for objects:

```js
const frozen = Object.freeze({ x: 1 })
frozen.x = 5          // silently ignored (throws in strict mode)

// Update immutably — create a NEW object instead of mutating
const updated = { ...frozen, x: 5 }
```

> 🎯 **Interview edge:** "Immutability matters because frameworks like React detect changes by reference comparison — mutating state in place breaks change detection. `Object.freeze` is shallow, so nested objects still need a deep freeze or structural sharing."

---

<a id="q6"></a>
## 6. Shallow Copy vs Deep Copy

**One-liner:** *"A shallow copy duplicates only the top level — nested objects are still shared by reference. A deep copy recursively clones every level, so the copy is fully independent."*

```js
const original = { name: "Sam", address: { city: "Delhi" } }

// Shallow copy — top level is copied, address is SHARED
const shallow = { ...original }            // or Object.assign({}, original)
shallow.address.city = "Mumbai"
console.log(original.address.city)         // "Mumbai" ← leaked! nested ref shared

// Deep copy — fully independent
const deep = structuredClone(original)     // modern, built-in (best)
deep.address.city = "Pune"
console.log(original.address.city)         // "Mumbai" — original untouched
```

**Three ways to deep copy, ranked:**

| Method | Pros | Cons |
|--------|------|------|
| `structuredClone(obj)` | Built-in, handles Dates/Maps/Sets, circular refs | No functions; newer runtimes only |
| `JSON.parse(JSON.stringify(obj))` | Simple, everywhere | Loses functions/`undefined`/Symbols; Dates → strings; breaks on circular refs |
| Recursive function / Lodash `cloneDeep` | Full control | More code / dependency |

> 🎯 **Interview edge:** "My default is `structuredClone`. I only use the JSON trick for plain data with no functions or Dates. The key insight is *why* shallow copies leak — spread and `Object.assign` copy reference values, and a nested object's value IS its reference."

---

<a id="q7"></a>
## 7. Spread vs Rest Syntax

**One-liner:** *"Same `...` token, opposite jobs. **Spread** expands an iterable into individual elements. **Rest** collects multiple elements into a single array/object. Context decides: rest sits in a parameter/destructuring target, spread sits in a call/literal."*

```js
// SPREAD — expands OUT
const merged = [...arr1, ...arr2]       // combine arrays
const clone  = { ...obj }               // shallow copy object
Math.max(...[3, 1, 2])                  // pass array as separate args

// REST — gathers IN
function sum(...nums) {                  // collect all args into an array
    return nums.reduce((a, b) => a + b, 0)
}
const [first, ...others] = [1, 2, 3, 4]  // others = [2, 3, 4]
const { id, ...rest } = user             // pull out id, gather the rest
```

> 🎯 **Interview edge:** "Benefits of spread: immutable merges/copies without mutating the source (important for React state), and clean array-to-args conversion that replaced `apply`. The rest parameter must always be **last**. Both are shallow — nested objects are still shared by reference."

---

# Part B — Functions, Scope & `this`

<a id="q8"></a>
## 8. First-Class Functions

**One-liner:** *"In JS, functions are first-class citizens — they're treated like any other value: stored in variables, passed as arguments, and returned from other functions."*

```js
const fn = function() { return "hi" };  // stored in a variable
[1, 2, 3].map(x => x * 2);              // passed as an argument (callback)
const make = factor => num => num * factor;  // returned from a function
const double = make(2)
double(5)                                // 10
```

> 🎯 **Interview edge:** "This single property is what *enables* higher-order functions, callbacks, closures, currying, and the entire functional style. Don't confuse it with 'higher-order function' — first-class is the language *capability*; a HOF is a function that *uses* that capability."

---

<a id="q9"></a>
## 9. Function Declaration vs Function Expression

**One-liner:** *"A declaration is fully hoisted, so it's callable before it appears. An expression is assigned to a variable, so only the variable is hoisted — calling it early throws because it's still `undefined`."*

```js
sayHi()                              // ✅ works — declaration is hoisted
function sayHi() { console.log("hi") }

sayBye()                             // ❌ TypeError: sayBye is not a function
var sayBye = function() {}           // only `var sayBye` (undefined) is hoisted
```

| | Declaration | Expression |
|--|------------|-----------|
| Hoisted | Fully (body included) | Only the variable |
| Callable before definition | ✅ | ❌ |
| Has a name | Always | Optional (named or anonymous) |

> 🎯 **Interview edge:** "Named function expressions (`const f = function fact(n){...}`) are useful for recursion and clearer stack traces — but the name is only visible inside the function. Arrow functions are always expressions and never hoisted."

---

<a id="q10"></a>
## 10. `function Person(){}` vs `Person()` vs `new Person()`

**One-liner:** *"`function Person(){}` defines the function. `Person()` calls it normally — `this` is undefined/window and it returns whatever's in the `return`. `new Person()` invokes it as a constructor — it creates a fresh object, binds `this` to it, and returns that object automatically."*

```js
function Person(name) {
    this.name = name
}

const a = Person("Sam")        // called normally → returns undefined
console.log(a)                 // undefined; "Sam" leaked onto global `this`!

const b = new Person("Sam")    // constructor → new object
console.log(b)                 // Person { name: "Sam" }
```

**What `new` does, in 4 steps** (a guaranteed follow-up):
1. Creates a fresh empty object `{}`.
2. Links its prototype to `Person.prototype`.
3. Binds `this` to that new object and runs the body.
4. Returns `this` automatically (unless the body returns its own object).

> 🎯 **Interview edge:** "Forgetting `new` is a classic bug — in non-strict mode `this` becomes the global object and properties leak globally. That's why constructors are PascalCase by convention, and why `class` syntax throws if you call it without `new`."

---

<a id="q11"></a>
## 11. `this` — Regular vs Arrow Functions

**One-liner:** *"In a regular function, `this` is dynamic — decided by **how the function is called**. In an arrow function, `this` is lexical — it has no `this` of its own and inherits it from the surrounding scope where it was defined."*

**The 4 binding rules for regular functions (priority order):**

| Priority | Rule | `this` is… |
|---|------|-----------|
| 1 | `new Foo()` | the new object |
| 2 | `fn.call/apply/bind(obj)` | the explicitly passed object |
| 3 | `obj.method()` | the object before the dot |
| 4 | `fn()` (standalone) | `undefined` (strict) / `window` (sloppy) |

```js
const user = {
    name: "Ravi",
    regular() { console.log(this.name) },   // "Ravi" — called as obj.method()
    arrow: () => console.log(this?.name),    // NOT "Ravi" — inherits the outer `this`, not the object
}
user.regular()   // "Ravi"
user.arrow()     // undefined in a module/Node; window.name ("") in a classic browser script
```

**Where arrows shine — callbacks inside methods:**

```js
const timer = {
    count: 0,
    start() {
        setInterval(() => this.count++, 1000)  // arrow keeps `this` = timer
    }
}
```

> 🎯 **Interview edge:** "Rule: regular functions for object methods (you need dynamic `this`), arrow functions for callbacks (you want to *capture* the surrounding `this`). Before arrows, people did `const self = this` or `.bind(this)` to solve the lost-`this` problem in callbacks."

---

<a id="q12"></a>
## 12. Arrow Functions in Constructors / Class Fields

**One-liner:** *"You don't make a constructor itself an arrow function — arrows can't be constructors (no `this`, no `prototype`). But you use arrow functions as **class fields** for methods that are passed as callbacks, so `this` stays bound to the instance."*

```js
class Button {
    constructor(label) { this.label = label }

    // ❌ regular method — `this` is lost when passed as a handler
    handleClickBad() { console.log(this.label) }

    // ✅ arrow class field — `this` is permanently the instance
    handleClick = () => { console.log(this.label) }
}

const b = new Button("Save")
element.addEventListener("click", b.handleClick)     // "Save" ✅
element.addEventListener("click", b.handleClickBad)  // undefined ❌ (this = element)
```

> 🎯 **Interview edge:** "This is *the* reason React class components used arrow class fields for event handlers — they auto-bind `this` to the instance, avoiding `this.handleClick = this.handleClick.bind(this)` in the constructor. Note: arrow methods live per-instance, not on the prototype, so there's a small memory trade-off."

---

<a id="q13"></a>
## 13. Higher-Order Functions & `map` / `filter` / `reduce`

**One-liner:** *"A higher-order function either takes a function as an argument or returns one. `map`, `filter`, and `reduce` are the canonical examples — they let you describe *what* you want, not *how* to loop."*

| Method | Returns | Purpose |
|--------|---------|---------|
| `map` | New array, same length | Transform every element |
| `filter` | New, possibly shorter array | Keep elements that pass a test |
| `reduce` | A single accumulated value | Collapse the array into one result |

```js
const nums = [5, 1, 3, 2, 6]

nums.map(x => x * 2)                          // [10, 2, 6, 4, 12]
nums.filter(x => x % 2 === 0)                 // [2, 6]
nums.reduce((sum, x) => sum + x, 0)           // 17

// chaining — first names of users under 30
users.filter(u => u.age < 30).map(u => u.firstName)
```

> 🎯 **Interview edge:** "All three are pure and non-mutating — they return new values, so they compose and chain safely. Always pass `reduce` an initial value (the 2nd arg) or it throws on empty arrays. `reduce` is the most powerful — you can implement `map` and `filter` with it."

---

<a id="q14"></a>
## 14. `call` vs `apply` vs `bind`

**One-liner:** *"All three let you set `this` manually. `call` invokes immediately with comma-separated args; `apply` invokes immediately with an args array; `bind` doesn't invoke — it returns a new function with `this` permanently fixed."*

```js
function greet(greeting, punct) {
    return `${greeting}, ${this.name}${punct}`
}
const user = { name: "Sam" }

greet.call(user, "Hi", "!")      // "Hi, Sam!"           — args listed
greet.apply(user, ["Hi", "!"])   // "Hi, Sam!"           — args in an array
const bound = greet.bind(user)   // returns a new fn
bound("Hey", ".")                // "Hey, Sam."          — call later
```

| Method | Invokes now? | Args format | Typical use |
|--------|-------------|-------------|-------------|
| `call`  | ✅ | `(ctx, a, b)` | Borrow a method with known args |
| `apply` | ✅ | `(ctx, [a, b])` | Args already in an array (e.g. `Math.max.apply(null, arr)`) |
| `bind`  | ❌ returns fn | `(ctx, a, b)` | Event handlers, callbacks, partial application |

> 🎯 **Interview edge:** "Memory hook: **A**pply = **A**rray. In modern code, spread (`Math.max(...arr)`) has largely replaced `apply`. `bind` is still essential for fixing `this` in callbacks and for partial application (pre-filling arguments)."

---

<a id="q15"></a>
## 15. Closures (deep dive + follow-ups)

**One-liner:** *"A closure is a function bundled with a reference to its surrounding lexical scope — so it keeps accessing those outer variables even after the outer function has returned."*

```js
function makeCounter() {
    let count = 0                 // private — not accessible from outside
    return () => ++count          // inner fn closes over `count`
}
const counter = makeCounter()
counter()  // 1
counter()  // 2   ← count persists between calls
```

**Why closures matter:** data privacy, stateful functions (counters/caches), event handlers that remember context, function factories, and memoization.

### Follow-up: Do closures store values or references?
**References, not snapshots.** The closure points at the live variable, so it sees later mutations. This is the classic `var` loop bug:

```js
for (var i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 0)   // 4 4 4 — all share one `i`
}
for (let i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 0)   // 1 2 3 — `let` gives each iteration its own binding
}
```

### Follow-up: How can closures cause memory leaks?
A closure keeps its captured variables alive as long as the closure is reachable. If you attach an event listener (a closure) and never remove it, or hold a closure over a large object, the GC can't reclaim that memory. **Fix:** `removeEventListener` when done, and null out references you no longer need.

### Follow-up: Why don't cyclic references break modern garbage collectors?
Old reference-*counting* GCs couldn't free two objects pointing at each other (count never hits 0). Modern engines use **mark-and-sweep**: they start from "roots" (global, call stack) and mark everything *reachable*. Anything unmarked — including unreachable cycles — is swept. Reachability, not reference count, is the test.

### Follow-up: What happens to closure variables during mark-and-sweep?
As long as a live closure references them, they're reachable from a root, so they're **marked and kept**. Once the closure itself becomes unreachable (e.g. the listener is removed and nothing else points to the function), its captured variables become unreachable too and are swept on the next cycle.

> 🎯 **Interview edge:** "The one-liner that wins: *every JS function is a closure* — closures aren't special syntax, they're the natural result of lexical scoping plus first-class functions. The `var` vs `let` loop question is the single most-asked closure question — know it cold."
>
> 📖 *For diagrams of the scope chain and the setTimeout loop trap, see [README → Closures (Step 22)](README.md).*

---

<a id="q16"></a>
## 16. Currying, Pure vs Impure Functions

**One-liner — Currying:** *"Currying transforms a function of N arguments into a chain of N single-argument functions. It enables partial application — locking in some arguments now and supplying the rest later."*

```js
const add = a => b => c => a + b + c
add(1)(2)(3)            // 6

const add5 = add(5)      // partial application — lock in a=5
add5(10)(20)             // 35
```

**One-liner — Pure vs Impure:** *"A pure function always returns the same output for the same input and has no side effects. An impure function depends on or mutates external state."*

```js
// Pure — no side effects, deterministic
const double = x => x * 2

// Impure — mutates external state / depends on outside
let total = 0
const addToTotal = x => { total += x }   // side effect
const now = () => Date.now()             // non-deterministic
```

> 🎯 **Interview edge:** "Pure functions are testable, cacheable (memoization), and safe to parallelize — they're the backbone of functional programming and Redux reducers. Currying produces reusable, composable specialized functions (`map(add5)`). See [§41](#q41) for the infinite-sum currying variant."

---

<a id="q17"></a>
## 17. IIFE Pattern

**One-liner:** *"An IIFE (Immediately Invoked Function Expression) is a function defined and executed at once. The wrapping `()` makes it an expression; the trailing `()` calls it instantly."*

```js
(function() {
    const secret = "hidden"      // private — not in global scope
    console.log("runs once")
})();

// Arrow IIFE with an argument
((name) => console.log(`Hi ${name}`))("Sam");
```

**Purpose:** create a **private scope** (avoid polluting globals), run one-time setup, and — historically — emulate modules before ES6 `import`/`export` existed.

> 🎯 **Interview edge:** "Before ES modules and `let`/`const`, IIFEs were *the* way to avoid global namespace collisions — the entire 'module pattern' and jQuery plugins were built on them. Today block scope + modules cover most cases, but IIFEs still appear for one-shot async setup: `(async () => { await init() })()`."

---

# Part C — Objects, Prototypes & OOP

<a id="q18"></a>
## 18. Ways to Create Objects in JavaScript

**One-liner:** *"Several ways, each with a use case: object literal, constructor function, ES6 class, `Object.create`, and factory functions."*

```js
// 1. Object literal — simplest, one-off objects
const a = { name: "Sam" }

// 2. Constructor function + new
function User(name) { this.name = name }
const b = new User("Sam")

// 3. ES6 class — modern syntactic sugar over the prototype pattern
class Person { constructor(name) { this.name = name } }
const c = new Person("Sam")

// 4. Object.create — explicit prototype link
const proto = { greet() { return "hi" } }
const d = Object.create(proto)

// 5. Factory function — returns an object, no `new` needed
const makeUser = name => ({ name })
const e = makeUser("Sam")
```

> 🎯 **Interview edge:** "`Object.create(null)` makes a truly empty object with **no prototype** — great for safe dictionaries/maps where you don't want inherited keys like `toString`. Factory functions avoid `this`/`new` pitfalls entirely and pair well with closures for privacy."

---

<a id="q19"></a>
## 19. Iterating Objects vs Arrays

**One-liner:** *"Arrays: `for...of` for values, `forEach`/`map` for callbacks, classic `for` for index control. Objects: `for...in` (includes inherited keys — guard it) or, better, `Object.keys/values/entries`."*

```js
// Arrays
for (const v of arr) {}              // values
arr.forEach((v, i) => {})            // callback with index
arr.map(v => v * 2)                  // transform → new array

// Objects
for (const key in obj) {             // ⚠️ also walks inherited enumerable keys
    if (Object.hasOwn(obj, key)) {}  // guard for own properties
}
Object.keys(obj)                     // ["a", "b"]
Object.values(obj)                   // [1, 2]
Object.entries(obj).forEach(([k, v]) => {})   // own [key, value] pairs
```

> 🎯 **Interview edge:** "`for...in` is for objects and walks the prototype chain — never use it on arrays (it iterates index *strings* and can pick up custom array properties). `for...of` works on any iterable (arrays, strings, Maps, Sets) but **not** plain objects, since objects aren't iterable. `Object.entries` + destructuring is my go-to for objects."

---

<a id="q20"></a>
## 20. Prototypal Inheritance

**One-liner:** *"Every object has a hidden `[[Prototype]]` link to another object. When you access a property that isn't on the object itself, JS walks up this prototype chain until it finds it or reaches `null`."*

```js
const arr = [1, 2, 3]
// arr doesn't own .map — it's found on Array.prototype via the chain:
// arr → Array.prototype → Object.prototype → null
arr.map(x => x)   // works because of the chain
```

```js
function User(name) { this.name = name }
User.prototype.greet = function() { return `Hi ${this.name}` }

const u = new User("Sam")
u.greet()              // "Hi Sam" — found on User.prototype, not on u
u.hasOwnProperty("greet")  // false — it's inherited, not own
```

> 🎯 **Interview edge:** "The key insight is *why* it's memory-efficient: shared methods live **once** on the prototype, not copied into every instance. This is also why all arrays share one `.map`. `class` syntax is pure sugar over this exact mechanism — `extends` just sets up the prototype chain and `super` calls the parent constructor."

---

<a id="q21"></a>
## 21. ES2025 Classes vs ES5 Constructor Functions

**One-liner:** *"Classes are cleaner syntactic sugar over the constructor + prototype pattern, plus genuinely new features: true private fields (`#`), static blocks, and stricter behaviour."*

```js
// ES5 — constructor function + manual prototype
function User(name) { this.name = name }
User.prototype.greet = function() { return "Hi " + this.name }

// ES2025 — class with private field
class UserModern {
    #password               // truly private — inaccessible outside the class
    static count = 0
    constructor(name, pw) { this.name = name; this.#password = pw }
    greet() { return `Hi ${this.name}` }
}
```

| | ES5 constructor | ES2025 class |
|--|----------------|--------------|
| Hoisting | Function-hoisted | Hoisted to TDZ (not callable early) |
| Call without `new` | Allowed (silent bug) | Throws `TypeError` |
| Privacy | Convention (`_name`) | True `#private` fields |
| Strict mode | Opt-in | Always on inside the body |
| Methods | Manual `.prototype.x =` | Auto on prototype |

> 🎯 **Interview edge:** "The biggest practical wins are `#private` fields (real encapsulation, not the old `_` convention) and that classes *force* `new` — eliminating the leaked-global bug from §10. Under the hood it's still prototypes, so it's not a new object model — just safer, clearer syntax."

---

# Part D — Asynchronous JavaScript

<a id="q22"></a>
## 22. Synchronous vs Asynchronous Functions

**One-liner:** *"Synchronous code runs line by line, blocking the thread until each step finishes. Asynchronous code offloads slow work (timers, network, I/O) to the environment and continues, handling the result later via callbacks/promises — without blocking."*

```js
// Synchronous — blocks
console.log("A")
const x = heavyLoop()    // everything waits here
console.log("B")

// Asynchronous — non-blocking
console.log("A")
setTimeout(() => console.log("B"), 1000)   // scheduled, doesn't block
console.log("C")          // runs immediately → A, C, B
```

> 🎯 **Interview edge:** "JS itself is single-threaded and synchronous — async behaviour comes from the **host environment** (browser Web APIs / Node libuv) plus the event loop, not the language. The golden rule: never block the main thread with heavy synchronous work, or the UI freezes."

---

<a id="q23"></a>
## 23. The Event Loop (deep dive + follow-ups)

**One-liner:** *"The event loop is the mechanism that lets single-threaded JS handle async work. It continuously checks: if the call stack is empty, it takes the next ready callback from the queues and pushes it onto the stack — draining all microtasks before each macrotask."*

**The players:**

| Component | Role |
|-----------|------|
| **Call Stack** | Runs synchronous code, one frame at a time |
| **Web APIs** | Browser handles timers, `fetch`, DOM events *off* the stack |
| **Macrotask (Callback) Queue** | `setTimeout`, `setInterval`, DOM events wait here |
| **Microtask Queue** | Promise `.then/.catch/.finally`, `queueMicrotask`, MutationObserver — higher priority |
| **Event Loop** | Stack empty? → drain ALL microtasks → then one macrotask → repeat |

```js
console.log("1")
setTimeout(() => console.log("2"), 0)        // macrotask
Promise.resolve().then(() => console.log("3")) // microtask
console.log("4")
// Output: 1 → 4 → 3 → 2
```

### Follow-up: Why do Promise callbacks run before `setTimeout`?
After each synchronous run (and each macrotask), the event loop **fully drains the microtask queue before touching the macrotask queue**. Promise callbacks are microtasks; `setTimeout` is a macrotask — so promises always win, even with `0` delay.

### Follow-up: What is event-loop starvation?
If microtasks keep scheduling more microtasks, the queue never empties — so macrotasks (and rendering) are **starved** and never run. The page can freeze.

```js
function starve() { Promise.resolve().then(starve) }  // 🚫 setTimeout callbacks never fire
```

### Follow-up: How do you yield control to keep the UI responsive?
Break heavy work into chunks and yield between them so the loop can render and process input:

```js
// Yield to the event loop between chunks
await new Promise(r => setTimeout(r, 0))
// or, modern:
await scheduler.yield?.()          // where available
requestIdleCallback(doLowPriorityWork)   // run when the browser is idle
```

### Follow-up: Why does the event loop belong to the host, not the language?
The ECMAScript spec defines only the **job queue** for promises. The full event loop, Web APIs (`setTimeout`, `fetch`, DOM), and the macrotask queue are provided by the **host environment** — the browser or Node.js (libuv). That's why `setTimeout` works in a browser but isn't part of "JavaScript" itself.

> 🎯 **Interview edge:** "Nail the order: *sync → all microtasks → one macrotask → all microtasks → next macrotask*. Mentioning that the loop also renders (~60fps) between macrotasks, and that the event loop is host-provided, signals real depth."
>
> 📖 *For step-by-step animations of the call stack, queues, and microtask draining, see [README → Promises & the Event Loop (Step 38)](README.md).*

---

<a id="q24"></a>
## 24. Microtask vs Macrotask Queue

**One-liner:** *"Microtasks (Promise callbacks, `queueMicrotask`, MutationObserver) have higher priority and are fully drained after each task. Macrotasks (`setTimeout`, `setInterval`, I/O, DOM events) run one per loop iteration."*

```js
console.log("start")
setTimeout(() => console.log("macrotask"), 0)
Promise.resolve().then(() => console.log("microtask"))
console.log("end")
// start → end → microtask → macrotask
```

| | Microtask | Macrotask |
|--|-----------|-----------|
| Examples | `.then/.catch/.finally`, `queueMicrotask`, MutationObserver | `setTimeout`, `setInterval`, `setImmediate`, I/O, UI events |
| Priority | Higher — entire queue drained first | Lower — one per loop turn |
| Risk | Starvation if they self-schedule | — |

> 🎯 **Interview edge:** "After *every* macrotask the engine drains the *whole* microtask queue before the next macrotask or a render. That's why chained `.then`s all resolve before the next `setTimeout`. This is really a sub-detail of the event loop ([§23](#q23))."

---

<a id="q25"></a>
## 25. Promises vs async/await (and how the event loop handles them)

**One-liner:** *"A Promise is an object representing the eventual result of an async operation, with states pending → fulfilled/rejected. `async/await` is syntactic sugar over promises that lets you write async code that reads synchronously — without blocking the thread."*

```js
// Promise chaining
fetchUser()
    .then(user => fetchPosts(user.id))
    .then(posts => render(posts))
    .catch(err => console.error(err))

// Same with async/await — flatter, try/catch error handling
async function load() {
    try {
        const user  = await fetchUser()
        const posts = await fetchPosts(user.id)
        render(posts)
    } catch (err) {
        console.error(err)
    }
}
```

**How the event loop handles them:** `await` **suspends** the async function and pops it off the call stack — the thread is free to run other code. When the awaited promise settles, the continuation is scheduled as a **microtask** and resumed when the stack clears. So `await` never blocks; it just defers the rest of the function.

**Sequential vs parallel** — a favourite follow-up:

```js
// ❌ Sequential — slow, each awaits the previous
const a = await fetchA()
const b = await fetchB()

// ✅ Parallel — both start at once
const [a, b] = await Promise.all([fetchA(), fetchB()])
```

> 🎯 **Interview edge:** "Key points that win: an `async` function *always* returns a promise; `await` resumes via the microtask queue (so it slots in before `setTimeout`); and use `Promise.all` for independent awaits to avoid accidental serial waterfalls. Promises also fixed callback hell *and* inversion of control — you attach `.then` yourself, so it fires exactly once."

---

<a id="q26"></a>
## 26. Polyfill for `Promise.all` (+ `Promise.allSettled`)

**One-liner:** *"`Promise.all` takes an iterable of promises and resolves with an array of results in order — but rejects immediately if any one rejects (fail-fast). My polyfill tracks a completion counter and preserves index order."*

```js
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = []
        let completed = 0

        if (promises.length === 0) return resolve(results)

        promises.forEach((p, index) => {
            // Promise.resolve handles non-promise values too
            Promise.resolve(p)
                .then(value => {
                    results[index] = value      // preserve ORDER, not finish-time
                    completed++
                    if (completed === promises.length) resolve(results)
                })
                .catch(reject)                  // first rejection rejects the whole thing
        })
    })
}

// Usage
promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    .then(console.log)   // [1, 2, 3]
```

### Follow-up: How is `Promise.allSettled` different, and when to use it?
**`allSettled` never rejects** — it waits for *every* promise to finish and returns a status object for each (`{status:"fulfilled", value}` or `{status:"rejected", reason}`). Use it when you want **all** results regardless of individual failures — e.g. firing 10 independent API calls and showing whichever succeed.

```js
Promise.allSettled([Promise.resolve(1), Promise.reject("x")])
    .then(console.log)
// [ {status:"fulfilled", value:1}, {status:"rejected", reason:"x"} ]
```

| Combinator | Resolves when | Rejects when |
|------------|--------------|--------------|
| `all` | All fulfill | Any rejects (fail-fast) |
| `allSettled` | All settle | Never |
| `race` | First settles (either way) | First settles if it's a rejection |
| `any` | First fulfills | All reject (`AggregateError`) |

> 🎯 **Interview edge:** "Two details interviewers look for in the polyfill: storing by **index** (not push order, since promises finish out of order) and wrapping inputs in `Promise.resolve` (so plain values work). `all` = 'all must succeed'; `allSettled` = 'tell me how each one did'."

---

<a id="q27"></a>
## 27. AJAX — Pros & Cons

**One-liner:** *"AJAX (Asynchronous JavaScript And XML) is the technique of exchanging data with a server in the background — without a full page reload — and updating only part of the page. Despite the name, today it's almost always JSON, not XML."*

```js
// Modern AJAX via fetch
fetch("/api/users")
    .then(res => res.json())
    .then(users => render(users))
```

**Pros:** no full-page reloads (faster, smoother UX), less bandwidth (only data, not whole pages), asynchronous (UI stays responsive), enables SPAs and live features.

**Cons:** breaks the browser Back button / bookmarking if not handled (history API needed), SEO challenges (content loaded after initial HTML), no-JS users get nothing, more complex error handling, potential security surface (CORS, XSS).

> 🎯 **Interview edge:** "The original transport was `XMLHttpRequest`; today we use `fetch` or `axios`. The conceptual leap AJAX enabled was the *single-page application* — updating views without navigation. Mention SEO/back-button as the real-world trade-offs and you sound experienced."

---

<a id="q28"></a>
## 28. The `fetch` API

**One-liner:** *"`fetch` is the modern promise-based API for HTTP requests. It returns a promise that resolves to a `Response` object, whose body you parse separately (e.g. `.json()`, which is itself async)."*

```js
async function getUser() {
    try {
        const res = await fetch("https://api.example.com/user")
        if (!res.ok) throw new Error(`HTTP ${res.status}`)  // ⚠️ must check manually
        const data = await res.json()
        return data
    } catch (err) {
        console.error("Fetch failed:", err)
    }
}
```

**The big gotcha:** `fetch` **only rejects on network failure**, not on HTTP errors. A 404 or 500 still *resolves* — so you must check `res.ok` / `res.status` yourself.

> 🎯 **Interview edge:** "Three things that show depth: (1) `fetch` doesn't reject on 4xx/5xx — check `res.ok`; (2) the body is a stream parsed once via `.json()`/`.text()`; (3) it supports `AbortController` for cancellation and timeouts. Compared to `XMLHttpRequest` it's cleaner and promise-based, but `axios` adds niceties like interceptors and automatic JSON."

---

# Part E — DOM, Events & the Browser

<a id="q29"></a>
## 29. Event Bubbling vs Capturing

**One-liner:** *"When an event fires, it travels in two phases. **Capturing** goes top-down from the root to the target; **bubbling** goes bottom-up from the target back to the root. By default, handlers run in the bubbling phase."*

```
        Capturing ↓                    Bubbling ↑
document → html → body → div → BUTTON → div → body → html → document
```

```js
child.addEventListener("click", handler)         // bubbling (default)
parent.addEventListener("click", handler, true)  // capturing (3rd arg = true)

// stop the event from travelling further
e.stopPropagation()
```

> 🎯 **Interview edge:** "`e.target` is what was actually clicked; `e.currentTarget` is the element the handler is attached to — that distinction is the basis of event delegation ([§30](#q30)). Capturing is rare in practice; you reach for it only when you must intercept an event *before* inner handlers see it."

---

<a id="q30"></a>
## 30. Event Delegation

**One-liner:** *"Event delegation means attaching a single listener to a common parent and using `e.target` to figure out which child triggered the event — instead of attaching a listener to each child."*

```js
// One listener handles all current AND future <li> items
document.querySelector("#list").addEventListener("click", e => {
    const item = e.target.closest("li")
    if (item) console.log("Clicked:", item.textContent)
})
```

**Why it's efficient:**
1. **Fewer listeners** — one instead of hundreds (less memory).
2. **Works for dynamic elements** — items added *after* page load are handled automatically, no re-binding.
3. **Less cleanup** — fewer closures held alive by listeners.

> 🎯 **Interview edge:** "It leans on event **bubbling** ([§29](#q29)) — the click bubbles up to the parent where the single listener catches it. Use `e.target.closest(selector)` to handle clicks on nested children robustly. This is the standard pattern for lists, tables, and any dynamically-rendered UI."

---

<a id="q31"></a>
## 31. `DOMContentLoaded` vs `window.onload`

**One-liner:** *"`DOMContentLoaded` fires as soon as the HTML is parsed and the DOM tree is ready — before images/stylesheets finish. `window.onload` (the `load` event) waits for *everything*, including images, fonts, and subframes."*

```js
document.addEventListener("DOMContentLoaded", () => {
    // DOM ready — safe to query/manipulate elements. Fires EARLY.
})

window.addEventListener("load", () => {
    // Everything (images, CSS, fonts) loaded. Fires LATER.
})
```

| | `DOMContentLoaded` | `load` (`window.onload`) |
|--|-------------------|--------------------------|
| Fires when | DOM parsed | All resources loaded |
| Timing | Earlier | Later |
| Use for | Most JS init / event wiring | Logic needing image sizes, full layout |

> 🎯 **Interview edge:** "Use `DOMContentLoaded` for almost all initialization — it's faster and the DOM is what you usually need. Reserve `load` for when you genuinely need final dimensions (image-dependent layouts, canvas work). Also worth mentioning: `defer` on a script tag effectively gives you the same 'DOM-ready' timing."

---

<a id="q32"></a>
## 32. Cookies vs sessionStorage vs localStorage

**One-liner:** *"All three store data in the browser, but they differ in capacity, lifetime, and whether they're sent to the server. Cookies (~4KB) are sent with every HTTP request; localStorage (~5–10MB) persists forever and stays client-side; sessionStorage is the same but cleared when the tab closes."*

| Feature | Cookies | sessionStorage | localStorage |
|---------|---------|----------------|--------------|
| Capacity | ~4 KB | ~5–10 MB | ~5–10 MB |
| Lifetime | Set expiry | Until tab closes | Until manually cleared |
| Sent to server | ✅ every request | ❌ | ❌ |
| Scope | Domain + path | Per tab | Per origin (all tabs) |
| Access from JS | `document.cookie` (unless `HttpOnly`) | `sessionStorage` API | `localStorage` API |

```js
localStorage.setItem("theme", "dark")
localStorage.getItem("theme")            // "dark" — survives restart
sessionStorage.setItem("step", "2")      // gone when tab closes
document.cookie = "token=abc; max-age=3600; Secure; SameSite=Strict"
```

> 🎯 **Interview edge:** "Use cookies for **auth/session tokens** (especially `HttpOnly` + `Secure` + `SameSite` — JS can't read them, mitigating XSS). Use localStorage for non-sensitive client preferences (theme, language) and sessionStorage for per-tab temporary state (a wizard's progress). Never put sensitive data in localStorage — any script on the page can read it. Both web storages hold **strings only**, so `JSON.stringify`/`parse` objects."

---

# Part F — Advanced & Performance

<a id="q33"></a>
## 33. WeakMap & WeakSet

**One-liner:** *"`WeakMap`/`WeakSet` are collections whose keys/values are held *weakly* — if there are no other references to a key object, it can be garbage-collected automatically. They only accept objects as keys and aren't iterable."*

```js
const cache = new WeakMap()

function getData(obj) {
    if (cache.has(obj)) return cache.get(obj)   // memoize per-object
    const result = expensiveCompute(obj)
    cache.set(obj, result)
    return result
}
// When `obj` is no longer referenced elsewhere, its cache entry is GC'd automatically
```

| | Map / Set | WeakMap / WeakSet |
|--|-----------|-------------------|
| Keys | Any type | Objects only |
| GC | Keys held strongly (leak risk) | Keys held weakly (auto-cleaned) |
| Iterable / `size` | ✅ | ❌ |

**Use cases:** caching/memoization keyed by object, storing private/metadata per DOM node without leaking, and tracking objects (e.g. "have I seen this?") without preventing their cleanup.

> 🎯 **Interview edge:** "The whole point is **leak prevention**: a normal `Map` keeps its keys alive forever, so caching DOM nodes there leaks memory after they're removed from the page. A `WeakMap` lets them be collected. The trade-off — no iteration and no `.size` — exists *because* entries can vanish at any time during GC."

---

<a id="q34"></a>
## 34. Performance — De-optimization & Why Deleting Properties Hurts

**One-liner:** *"V8 optimizes objects by assigning them a hidden 'shape' (hidden class) so property access is fast. Operations that change an object's shape unpredictably — especially `delete` — force V8 to abandon those optimizations and fall back to slow dictionary mode."*

```js
const obj = { a: 1, b: 2, c: 3 }   // V8 builds a hidden class for this shape

delete obj.b                        // ❌ shape changes → may switch to slow dictionary mode

obj.b = undefined                   // ✅ keeps the shape, just clears the value
```

**Why `delete` is slow:** V8 stores object properties in a compact, shape-based layout (like a struct). `delete` punches a hole in that layout, so V8 often converts the object to a hash-table ("dictionary mode"), making *all* future property access on it slower.

**Other de-optimizers to mention:** changing a property's type repeatedly (monomorphic → polymorphic), adding properties in inconsistent order across instances, and creating "holey" arrays (sparse arrays with gaps).

> 🎯 **Interview edge:** "The fix is to keep object shapes stable: initialize all properties in the constructor in the same order, set unwanted values to `null`/`undefined` instead of `delete`, and use `Map` when you genuinely need to add/remove keys dynamically. Mentioning *hidden classes / inline caches* by name signals you understand the engine, not just the symptom."
>
> 📖 *For how V8 (Ignition, TurboFan, hidden classes) compiles and optimizes your code, see [README → JS Engine & V8 Architecture (Step 48)](README.md).*

---

<a id="q35"></a>
## 35. Webpack & Module Bundlers

**One-liner:** *"Webpack is a module bundler — it builds a dependency graph from your entry file, then bundles all modules (JS, CSS, images) into optimized files the browser can load efficiently."*

**Core concepts:**

| Concept | Role |
|---------|------|
| **Entry** | The starting module of the dependency graph |
| **Output** | Where bundled files are written |
| **Loaders** | Transform non-JS files (Babel for JS, css-loader, etc.) |
| **Plugins** | Wider build tasks (minify, inject HTML, env vars) |

**Why bundlers exist:** they enable a modular codebase (many small files) while shipping few optimized requests; they support transpilation (modern JS → compatible JS), **tree-shaking** (drop unused code), **code-splitting** (load chunks on demand), and minification.

> 🎯 **Interview edge:** "I'd frame it around *problems solved*: too many HTTP requests, browsers not understanding modern/JSX/TS, and shipping dead code. Then mention the modern landscape — **Vite/esbuild** are now common for their near-instant dev server using native ES modules, while Webpack still dominates complex production builds. Knowing *why* you'd pick one shows maturity beyond memorized config."

---

# Part G — Coding Challenges

<a id="q36"></a>
## 36. Implement `debounce` (+ throttle, real-world uses)

**One-liner:** *"Debounce delays running a function until a pause in activity — it resets the timer on every call, so the function only fires once the events stop for N milliseconds."*

```js
function debounce(fn, delay) {
    let timerId
    return function (...args) {
        clearTimeout(timerId)                       // cancel the pending call
        timerId = setTimeout(() => {
            fn.apply(this, args)                    // preserve `this` and args
        }, delay)
    }
}

// Usage — only search after the user stops typing for 300ms
const onSearch = debounce(query => fetchResults(query), 300)
input.addEventListener("input", e => onSearch(e.target.value))
```

### Follow-up: Difference between debounce and throttle?
- **Debounce** — waits for *silence*. Fires once, after activity stops. *"Run after the user is done."*
- **Throttle** — fires at most once per interval *during* activity. *"Run at a steady rate."*

```js
function throttle(fn, limit) {
    let waiting = false
    return function (...args) {
        if (!waiting) {
            fn.apply(this, args)
            waiting = true
            setTimeout(() => (waiting = false), limit)
        }
    }
}
```

### Follow-up: Real-world use cases
- **Debounce:** search-as-you-type (wait until typing stops), form validation, auto-save, resize handlers that rebuild layout.
- **Throttle:** scroll position tracking, mouse-move, drag, infinite-scroll triggers, rate-limiting API calls.

> 🎯 **Interview edge:** "The two details interviewers check: forwarding `this` and `args` via `apply`, and the closure over `timerId` that persists between calls. One-line mnemonic — *debounce = wait for the dust to settle; throttle = a steady drip*."

---

<a id="q37"></a>
## 37. Method Chaining — `calculate.add(2).mul(4).subs(1).value`

**One-liner:** *"Method chaining works when each method returns the object itself (`this`), so the next method can be called on the result. A trailing property (`value`) exposes the final result."*

```js
const calculate = {
    total: 0,
    add(n)  { this.total += n; return this },   // return this → enables chaining
    mul(n)  { this.total *= n; return this },
    subs(n) { this.total -= n; return this },
    get value() { return this.total },           // getter — no parentheses needed
}

console.log(calculate.add(2).mul(4).subs(1).value)   // (0+2)*4 - 1 = 7
```

**Class version** (handles fresh instances / avoids shared state):

```js
class Calculator {
    #total = 0
    add(n)  { this.#total += n; return this }
    mul(n)  { this.#total *= n; return this }
    subs(n) { this.#total -= n; return this }
    get value() { return this.#total }
}
const calc = new Calculator()
calc.add(2).mul(4).subs(1).value   // 7
```

> 🎯 **Interview edge:** "The whole trick is `return this` from every chainable method, and using a **getter** for `.value` so it reads like a property, not a call. This is exactly how jQuery, Lodash chains, and query builders work. Mention that the object-literal version shares state across chains, so a class/factory is cleaner for reuse."

---

<a id="q38"></a>
## 38. Capitalize First Letter of Each Word

**Problem:** Given `"India is my country"`, return `"India Is My Country"`.

```js
function capitalizeWords(sentence) {
    return sentence
        .split(" ")                                   // → ["India", "is", "my", "country"]
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")                                    // → "India Is My Country"
}

capitalizeWords("India is my country")   // "India Is My Country"
```

**One-liner with regex** (mention as an alternative):

```js
const capitalize = s => s.replace(/\b\w/g, c => c.toUpperCase())
```

> 🎯 **Interview edge:** "Walk through it: split into words, transform each (uppercase first char + keep the rest), join back. Discuss edge cases — extra/multiple spaces, empty strings, already-capitalized input. The regex `\b\w` (word boundary + first char) is the slick alternative that shows breadth."

---

<a id="q39"></a>
## 39. Print 1–10 with a 1-Second Delay Between Each

**One-liner:** *"The classic trap is using `var` in a loop with `setTimeout` — all callbacks share one variable. The clean fixes are `let` (block scoping) or `async/await`."*

```js
// ✅ Fix 1 — let gives each iteration its own binding
for (let i = 1; i <= 10; i++) {
    setTimeout(() => console.log(i), i * 1000)   // staggered: 1s, 2s, ... 10s
}
```

```js
// ✅ Fix 2 — async/await: genuinely waits 1s between each (cleanest intent)
const sleep = ms => new Promise(res => setTimeout(res, ms))

async function printNumbers() {
    for (let i = 1; i <= 10; i++) {
        await sleep(1000)
        console.log(i)
    }
}
printNumbers()
```

```js
// ❌ The bug to explain — var prints "11" ten times
for (var i = 1; i <= 10; i++) {
    setTimeout(() => console.log(i), i * 1000)   // all share one `i`, ends at 11
}
```

> 🎯 **Interview edge:** "Explain *why* `var` fails — one shared binding the callbacks read after the loop finishes (when `i` is 11) — and that `let` creates a fresh binding per iteration. The `async/await` version is best when you want true *sequential 1-second gaps* rather than all timers scheduled upfront."

---

<a id="q40"></a>
## 40. Flatten an Array (without `Array.flat`)

**One-liner:** *"Flattening turns a nested array into a single-level array. I'd solve it with recursion — reduce over the array, and if an element is itself an array, recurse into it."*

```js
function flatten(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flatten(item) : item)
    }, [])
}

flatten([1, [2, [3, [4]]], 5])   // [1, 2, 3, 4, 5]
```

**Iterative version with a stack** (avoids deep-recursion stack overflow):

```js
function flattenIterative(arr) {
    const stack = [...arr]
    const result = []
    while (stack.length) {
        const next = stack.pop()
        if (Array.isArray(next)) stack.push(...next)   // push children back
        else result.push(next)
    }
    return result.reverse()   // pop reverses order
}
```

> 🎯 **Interview edge:** "Mention complexity (O(n) over total elements) and that deep recursion risks a stack overflow on very nested input — which is why the iterative stack-based version exists. For controlled depth, you can add a `depth` parameter to mimic `flat(depth)`."

---

<a id="q41"></a>
## 41. Currying for Infinite Sum — `sum(10)(20)(30)() → 60`

**One-liner:** *"This is currying with a termination condition: each call returns a new function that accumulates the running total, and calling it with **no argument** ends the chain and returns the sum."*

```js
function sum(a) {
    return function (b) {
        if (b === undefined) return a      // empty call () ends the chain
        return sum(a + b)                  // otherwise keep accumulating
    }
}

sum(10)(20)(30)()   // 60
sum(5)(5)(5)(5)()   // 20
```

**Variant — variadic sum that auto-evaluates** (`sum(1)(2)(3)` usable as a number):

```js
function sum(a) {
    const fn = b => sum(a + b)
    fn.valueOf = () => a        // coerces to the number when used in math/string context
    return fn
}
console.log(+sum(10)(20)(30))   // 60  — unary + triggers valueOf
```

> 🎯 **Interview edge:** "Two known patterns: (1) the empty-call terminator `()` (checking `b === undefined`), and (2) the `valueOf`/`toString` trick that lets the returned function *be* the number when coerced. Tie it back to closures — each returned function closes over the running total. See [§16](#q16) for the currying fundamentals."

---

# Part H — Scenario / System Design

<a id="q42"></a>
## 42. Real-Time Chat — Efficient DOM Updates Without Blocking

**The question:** *"You're building a real-time chat where many messages arrive simultaneously. How do you keep the DOM updates efficient without blocking the main thread?"*

**One-liner:** *"I'd batch incoming messages and flush them in a single DOM write per animation frame, render off-screen with a `DocumentFragment`, and offload any heavy work (parsing, formatting) so the main thread stays free for rendering and input."*

**Strategy — explain these layers:**

**1. Batch + flush on `requestAnimationFrame`** — don't touch the DOM per message; buffer them and write once per frame (~16ms):

```js
let queue = []
let scheduled = false

function enqueueMessage(msg) {
    queue.push(msg)
    if (!scheduled) {
        scheduled = true
        requestAnimationFrame(flush)      // coalesce many messages into one paint
    }
}

function flush() {
    const fragment = document.createDocumentFragment()   // off-screen, no reflow per node
    for (const msg of queue) {
        const el = document.createElement("div")
        el.textContent = msg.text
        fragment.appendChild(el)
    }
    chatContainer.appendChild(fragment)   // ONE DOM insertion → one reflow
    queue = []
    scheduled = false
}
```

**2. Use a `DocumentFragment`** so appending N nodes triggers a single reflow/repaint instead of N.

**3. Virtualize the list** — for thousands of messages, render only what's visible (windowing, e.g. react-window) so the DOM node count stays bounded.

**4. Offload heavy work** — parse/format/markdown/emoji off the main thread with a **Web Worker**; post results back to be rendered.

**5. Don't starve the loop** — if processing a burst is heavy, chunk it and yield (`setTimeout(0)` / `scheduler.yield`) so input and rendering still happen.

> 🎯 **Interview edge:** "The core principle is *minimize reflows and never block the main thread* ([§23](#q23)). Batching with `requestAnimationFrame` + `DocumentFragment` is the headline answer; mentioning **list virtualization** for scale and a **Web Worker** for heavy parsing shows you think about real production constraints, not just correctness. Also mention WebSocket as the transport and debouncing scroll-to-bottom."

---

## Final tips for the interview

1. **Think out loud.** Interviewers hire for reasoning, not recall. Narrate your approach.
2. **Start simple, then optimize.** Give the working answer, then mention the edge cases / performance angle (the 🎯 lines).
3. **Tie answers to the engine.** Mentioning the call stack, event loop, prototype chain, or hidden classes signals real understanding.
4. **Admit the limits.** "`structuredClone` is my default, but it can't clone functions" beats pretending. Honesty + a correct fallback reads as senior.
5. **Use real examples.** "I used debounce on a search box" lands better than a textbook definition.

> Pair this file with [README.md](README.md) — the README has the *deep theory and diagrams*; this file has the *spoken interview answers*. Read theory → cover answer → say it out loud.
