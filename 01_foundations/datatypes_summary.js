// ============================================================
// CONCEPT: Primitive vs Reference Types — Stack vs Heap Memory
// ============================================================
//
//  PRIMITIVE TYPES (7 total) — stored on the STACK
//  ─────────────────────────────────────────────────
//  String, Number, Boolean, null, undefined, Symbol, BigInt
//
//  When you copy a primitive, you get an INDEPENDENT COPY.
//  Changing the copy does NOT affect the original.
//
//  REFERENCE TYPES (Non-Primitive) — stored on the HEAP
//  ─────────────────────────────────────────────────────
//  Object, Array, Function
//
//  When you copy a reference type, both variables point to the
//  SAME object in memory (they share a reference).
//  Changing one WILL affect the other.
//
//  Visual:
//   Stack          Heap
//   ┌────────┐    ┌───────────────┐
//   │ a = 5  │    │ obj { x: 1 } │ ← both ref1 and ref2 point here
//   │ b = 5  │    └───────────────┘
//   │ ref1 ──┼───►
//   │ ref2 ──┼───►
//   └────────┘
// ============================================================

// --- PRIMITIVE TYPES ---
const score = 100
const scoreValue = 100.3

const isLoggedIn = false
const outsideTemp = null   // null: intentional empty value
let userEmail;             // undefined: not assigned yet

// Symbol — always unique, even with the same description
const id = Symbol('123')
const anotherId = Symbol('123')

console.log(id === anotherId);   // false — Symbols are ALWAYS unique

// const bigNumber = 3456543576654356754n  // BigInt — for very large integers


// --- REFERENCE TYPES (Non-Primitive) ---
// These live on the Heap; variables hold a reference (memory address)

const heros = ["shaktiman", "naagraj", "doga"];  // Array
let myObj = {
    name: "hitesh",
    age: 22,
}

const myFunction = function(){   // Function
    console.log("Hello world");
}

console.log(typeof anotherId);   // "symbol"

// Reference: https://262.ecma-international.org/5.1/#sec-11.4.3


/* ============================================================
   STACK (Primitive) — you get a COPY of the value
   Modifying the copy has NO effect on the original.
   ============================================================ */
let myYouTubeName = "hiteshchoudharydotcom"

let anotherName = myYouTubeName   // COPY of the string value
anotherName = "chaiaurcode"       // only changes anotherName

console.log(myYouTubeName)        // "hiteshchoudharydotcom" — unchanged
console.log(anotherName)          // "chaiaurcode"


/* ============================================================
   HEAP (Non-Primitive) — you get a REFERENCE to the same object
   Modifying via either variable CHANGES THE ORIGINAL OBJECT.
   ============================================================ */
let userOne = {
    email : "user@gmail.com",
    upi : "user@ybl"
}

let userTwo = userOne             // both point to the SAME object in Heap

userTwo.email = "hitesh@google.com"  // modifying via userTwo...

console.log(userOne.email)        // "hitesh@google.com" ← userOne also changed!
console.log(userTwo.email)        // "hitesh@google.com"
