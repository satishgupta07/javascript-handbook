// ============================================================
// CONCEPT: Arrow Functions & `this` Binding
// ============================================================
// Arrow functions (=>) are a concise way to write functions.
// The KEY difference from regular functions is how `this` works.
//
//  Regular function:  `this` depends on HOW the function is called
//                     (the calling object determines `this`)
//
//  Arrow function:    `this` is LEXICALLY bound — it inherits `this`
//                     from the surrounding scope where it was DEFINED
//                     Arrow functions do NOT have their own `this`
//
// SYNTAX variations:
//   const fn = (a, b) => { return a + b }   ← block body with explicit return
//   const fn = (a, b) => a + b              ← implicit return (no braces needed)
//   const fn = (a, b) => ( a + b )          ← implicit return with parens (cleaner)
//   const fn = a => a * 2                   ← single param: parens optional
// ============================================================

const user = {
    username: "hitesh",
    price: 999,

    // Regular function method — `this` refers to the `user` object
    welcomeMessage: function() {
        console.log(`${this.username} , welcome to website`);
        console.log(this);  // logs the entire `user` object
    }
}

user.welcomeMessage()          // "hitesh , welcome to website"
user.username = "sam"
user.welcomeMessage()          // "sam , welcome to website" — `this` updates dynamically

// In Node.js global scope, `this` is an empty object {}
// In browser global scope, `this` is the `window` object
console.log(this);  // {} in Node.js

console.log("***************************************************************************")

// Regular function — has its own `this` (would be global/undefined in strict mode)
// function chai(){
//     let username = "hitesh"
//     console.log(this.username);  // undefined — `this` in a regular function is global
// }
// chai()

// Function expression — same `this` behaviour as regular function
// const chai = function () {
//     let username = "hitesh"
//     console.log(this.username);  // undefined
// }

// Arrow function — NO own `this`, inherits from outer (module/global) scope
const chai = () => {
    let username = "hitesh"
    console.log(this);   // {} — arrow inherits the outer scope's `this` (empty in Node)
}
chai()


// ============================================================
// Arrow function syntax variations
// ============================================================

// Block body with explicit return
// const addTwo = (num1, num2) => {
//     return num1 + num2
// }

// Implicit return — no braces, no return keyword needed
// const addTwo = (num1, num2) => num1 + num2

// Implicit return wrapped in () — useful when returning an object literal
const addTwo = (num1, num2) => ( num1 + num2 )
// NOTE: () around the expression also works for object literals:
// const makeObj = (a) => ({ value: a })  ← must wrap object in () to avoid
//                                            {} being read as a function body

console.log(addTwo(3, 4))  // 7
