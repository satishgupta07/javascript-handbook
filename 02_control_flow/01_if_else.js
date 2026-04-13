// ============================================================
// CONCEPT: Control Flow — if / else if / else
// ============================================================
// Conditional statements execute code based on a condition.
//
//  if (condition) { }              → runs if condition is truthy
//  else if (condition) { }         → checked only if previous was false
//  else { }                        → runs if all above were false
//
// COMPARISON OPERATORS:
//   <   <=   >   >=   ==   ===   !=   !==
//
// LOGICAL OPERATORS:
//   &&  (AND) → true only if BOTH sides are true
//   ||  (OR)  → true if AT LEAST ONE side is true
//   !   (NOT) → inverts the boolean value
//
// Variables declared with let/const inside an if block are
// block-scoped — NOT accessible outside the block.
// ============================================================

// if
const isUserloggedIn = true
const temperature = 40

// if ( temperature === 40 ){
//     console.log("less than 50");
// } else {
//     console.log("temperature is greater than 50");
// }

// console.log("Execute");
// <, >, <=, >=, ==, !=, ===, !==

// Block scope example — `power` is only accessible inside the if block
// const score = 200
// if (score > 100) {
//     let power = "fly"
//     console.log(`User power: ${power}`);
// }
// console.log(`User power: ${power}`);  // ❌ ReferenceError — power is block-scoped


// Shorthand if (no braces) — only works for a single statement, not recommended
// const balance = 1000
// if (balance > 500) console.log("test"),console.log("test2");

// if / else if / else chain
// if (balance < 500) {
//     console.log("less than 500");
// } else if (balance < 750) {
//     console.log("less than 750");
// } else if (balance < 900) {
//     console.log("less than 900");
// } else {
//     console.log("less than 1200");
// }


// ============================================================
// LOGICAL OPERATORS — combining conditions
// ============================================================
const userLoggedIn = true
const debitCard = true
const loggedInFromGoogle = false
const loggedInFromEmail = true

// AND (&&) — ALL conditions must be true
// 2==3 is false, so the whole condition is false → nothing prints
if (userLoggedIn && debitCard && 2==3) {
    console.log("Allow to buy course");
}

// OR (||) — at least ONE condition must be true
// loggedInFromEmail is true → prints
if (loggedInFromGoogle || loggedInFromEmail) {
    console.log("User logged in");
}
