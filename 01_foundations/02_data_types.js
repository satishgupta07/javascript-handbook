// ============================================================
// CONCEPT: Data Types in JavaScript
// ============================================================
// JavaScript has 8 data types split into two categories:
//
//  PRIMITIVE (stored by value, on the Stack):
//  ┌─────────────┬───────────────────────────────────────┐
//  │ Type        │ Example                               │
//  ├─────────────┼───────────────────────────────────────┤
//  │ Number      │ 42, 3.14  (up to 2^53 - 1)           │
//  │ BigInt      │ 9007199254740993n  (huge integers)    │
//  │ String      │ "hello", 'world', `template`         │
//  │ Boolean     │ true / false                          │
//  │ null        │ intentional absence of value          │
//  │ undefined   │ variable declared but not assigned    │
//  │ Symbol      │ always unique, used as object keys    │
//  └─────────────┴───────────────────────────────────────┘
//
//  NON-PRIMITIVE / REFERENCE (stored by reference, on the Heap):
//  Object, Array, Function
//
// typeof operator → returns a string describing the type
// NOTE: typeof null === "object" is a historical JS bug
// ============================================================

"use strict"; // Enables strict mode — catches common coding mistakes and prevents unsafe features

// alert( 3 + 3) // works in browser; not available in Node.js

// Examples of each primitive type
let name = "hitesh"       // string
let age = 18              // number
let isLoggedIn = false    // boolean
let state;                // undefined — declared but no value assigned

// Numeric limit: Number can safely represent integers up to 2^53
// Beyond that, use BigInt (suffix n)
// number => 2 to power 53
// bigint
// string => ""
// boolean => true/false
// null => standalone value — used to intentionally empty a variable
// undefined => default value when a variable is declared but not assigned
// symbol => always unique, even if two symbols have the same description

// object — reference type (covered in 02_basics)

// typeof returns the type as a string
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" ← known JS quirk / historical bug
