// ============================================================
// CONCEPT: Comparison Operators
// ============================================================
// Operators: >  <  >=  <=  ==  !=  ===  !==
//
//  == (loose equality)   → converts types before comparing
//  === (strict equality) → checks BOTH value AND type — ALWAYS prefer this
//
// TRICKY CASES with null and undefined:
//   Comparison operators (>, <, >=, <=) convert null to 0
//   Equality operator (==) treats null and undefined as a special case:
//     null == undefined  → true (they are loosely equal to each other)
//     null == 0          → false (null is NOT equal to 0 via ==)
//
// This inconsistency is a known JS quirk — avoid comparing with null/undefined directly.
// ============================================================

// Basic comparisons (commented out — uncomment to try):
// console.log(2 > 1);   // true
// console.log(2 >= 1);  // true
// console.log(2 < 1);   // false
// console.log(2 == 1);  // false
// console.log(2 != 1);  // true

// JS converts string to number for comparison:
// console.log("2" > 1);   // true  — "2" becomes 2
// console.log("02" > 1);  // true  — "02" becomes 2

// ---- null edge cases ----
// Comparison operators convert null → 0
console.log(null > 0);   // false — 0 > 0 is false
console.log(null == 0);  // false — == does NOT convert null to 0
console.log(null >= 0);  // true  — 0 >= 0 is true  ← seems contradictory!

/* Why is (null >= 0) true but (null == 0) false?
   - Comparison operators (>, <, >=, <=) internally convert null to the number 0
     So null >= 0 becomes 0 >= 0 which is true.
   - The equality operator (==) has a special rule: null only equals undefined,
     nothing else. So null == 0 is false.
   This is why you should NEVER compare null with >, <, >=, <=.          */

// ---- undefined edge cases ----
// undefined converts to NaN in numeric comparisons → always false
console.log(undefined == 0);   // false — undefined is not equal to 0
console.log(undefined > 0);    // false — NaN > 0 is false
console.log(undefined <= 0);   // false — NaN <= 0 is false

// ============================================================
// CONCEPT: Strict Equality ===
// ============================================================
// === checks type AND value — no type coercion happens
// Always use === to avoid surprising results
// ============================================================
console.log("2" === 2);  // false — string "2" is NOT the same type as number 2
