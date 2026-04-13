// ============================================================
// CONCEPT: Closures
// ============================================================
// A closure is a function that REMEMBERS the variables from its
// outer (enclosing) scope, even after the outer function has returned.
//
// HOW IT WORKS:
//   When a function is created, it carries a reference to its
//   surrounding scope (called a "lexical environment").
//   Even when the outer function finishes executing, the inner
//   function still has access to those variables.
//
// KEY POINTS:
//   - Closures are created every time a function is created
//   - The inner function has access to: its own scope + outer scope + global scope
//   - Variables are SHARED by reference, not copied
//   - Used for: data privacy, factory functions, event handlers, memoization
//
// COMMON USE CASES:
//   - Creating private variables (data encapsulation)
//   - Function factories (functions that return customised functions)
//   - Preserving state between function calls
// ============================================================


// ============================================================
// Example 1: Scope chain — inner functions access outer variables
// ============================================================
// function init() {
//     let name = "Mozilla";
//     function displayName() {
//         console.log(name);   // `name` is closed over from init()
//     }
//     displayName();
// }
// init();

function outer(){
    let username = "hitesh"   // outer variable

    // console.log("OUTER", secret);  // ❌ cannot access inner's variables

    function inner(){
        let secret = "my123"           // inner-only variable
        console.log("inner", username); // ✅ closes over outer's `username`

        function tooInner() {
            // tooInner closes over BOTH outer's username AND inner's secret
            console.log("TOO INNER", username);
        }
        tooInner()
    }

    function innerTwo(){
        console.log("innerTwo", username);  // ✅ also closes over outer's `username`
        // console.log(secret);             // ❌ can't access inner()'s `secret`
    }

    inner()
    innerTwo()
}
outer()
// console.log("TOO OUTER", username);  // ❌ can't access outer()'s variables from here


// ============================================================
// Example 2: Returning a function — closure preserves the variable
// ============================================================
// Even after makeFunc() finishes, displayName still has access
// to `name` because closures capture the lexical environment.

function makeFunc() {
    const name = "Mozilla";    // this variable would normally be destroyed after makeFunc returns
    function displayName() {
        console.log(name);     // but displayName CLOSES OVER `name` — it lives on
    }
    return displayName;        // return the inner function (not its result)
}

const myFunc = makeFunc();   // makeFunc is done, but `name` is preserved in the closure
myFunc();                    // "Mozilla" — still accessible via the closure
