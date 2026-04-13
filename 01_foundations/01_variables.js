// ============================================================
// CONCEPT: Variables in JavaScript
// ============================================================
// JavaScript has 3 ways to declare variables:
//
//  const  → value cannot be reassigned (block-scoped)
//  let    → value can be reassigned    (block-scoped)
//  var    → old way, AVOID — has function-scope issues
//           (leaks out of if-blocks, for-loops etc.)
//
// Rule of thumb: default to const, use let when you need
// to reassign, never use var in modern code.
// ============================================================

const accountId = 144553         // const: cannot be changed after assignment
let accountEmail = "satish@google.com"    // let: can be updated
var accountPassword = "12345"    // var: avoid — function-scoped, not block-scoped
accountCity = "Jaipur"           // no keyword: implicitly global — VERY BAD practice
let accountState;                // declared but not assigned → value is undefined

// accountId = 2 // ❌ TypeError: Assignment to constant variable

// Reassigning let and var is fine
accountEmail = "satishgupta@google.com"
accountPassword = "21212121"
accountCity = "Bengaluru"

console.log(accountId);

/*
  Why avoid var?
  var is function-scoped, not block-scoped.
  This means a var declared inside an if-block or for-loop
  leaks into the surrounding function — causing hard-to-find bugs.
  Always use let or const instead.
*/

// console.table prints an array/object in a neat table format in the console
console.table([accountId, accountEmail, accountPassword, accountCity, accountState])
