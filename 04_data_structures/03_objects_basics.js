// ============================================================
// CONCEPT: Objects — Literals, Symbols as Keys, Methods
// ============================================================
// An object is a collection of key-value pairs.
// Keys are strings by default, but can also be Symbols.
//
// Two creation approaches:
//   Object literal:   const obj = { key: value }    ← common
//   Object.create():  const obj = Object.create(proto) ← for prototype chains
//
// Key access:
//   obj.key           → dot notation (only works for valid identifier keys)
//   obj["key"]        → bracket notation (works for any key, including spaces)
//   obj[symbolKey]    → bracket notation required for Symbol keys
//
// Object.freeze(obj) → makes object immutable (no new props, no changes)
//
// Adding methods to objects:
//   obj.method = function() { ... }
//   Inside a method, `this` refers to the object itself
// ============================================================

// singleton: Object.create() creates a single prototype-linked instance

// Object literal — most common way to create objects
const mySym = Symbol("key1")   // Symbol as a unique property key

const JsUser = {
    name: "Hitesh",
    "full name": "Hitesh Choudhary",  // key with space — must use bracket notation to access
    [mySym]: "mykey1",                 // Symbol key — must use bracket notation
    age: 18,
    location: "Jaipur",
    email: "hitesh@google.com",
    isLoggedIn: false,
    lastLoginDays: ["Monday", "Saturday"]
}

// Accessing properties
// console.log(JsUser.email)         // dot notation
// console.log(JsUser["email"])      // bracket notation (same result)
// console.log(JsUser["full name"])  // must use bracket notation for keys with spaces
// console.log(JsUser[mySym])        // must use bracket notation for Symbol keys

// Modifying properties
JsUser.email = "hitesh@chatgpt.com"

// Object.freeze — prevents any further changes to the object
// Object.freeze(JsUser)

JsUser.email = "hitesh@microsoft.com"  // if frozen, this silently fails
console.log(JsUser);

// ============================================================
// Adding methods to an object
// ============================================================
// Regular function: `this` refers to the JsUser object
JsUser.greeting = function(){
    console.log("Hello JS user");
}

// Template literal with `this`: accesses the object's own name property
JsUser.greetingTwo = function(){
    console.log(`Hello JS user, ${this.name}`);
}

console.log(JsUser.greeting());     // "Hello JS user"  (logs the message + undefined return)
console.log(JsUser.greetingTwo());  // "Hello JS user, Hitesh"
