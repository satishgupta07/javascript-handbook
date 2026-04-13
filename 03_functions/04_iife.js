// ============================================================
// CONCEPT: IIFE — Immediately Invoked Function Expression
// ============================================================
// An IIFE is a function that runs immediately when it is defined.
//
// WHY use IIFE?
//   - Avoids polluting the global scope with variables
//   - Useful for initialization code that should run once
//     (e.g., connecting to a DB, setting up config)
//   - Creates a private scope — variables inside are not accessible outside
//
// SYNTAX:
//   (function() { ... })();
//    ↑ wrap in ()    ↑ immediately call with ()
//
// The outer () turns the function into an expression.
// The final () invokes it immediately.
//
// NAMED IIFE:     (function myName() { ... })();
// ARROW IIFE:     (() => { ... })();
// WITH PARAMS:    ((param) => { ... })('value');
// ============================================================

// Named IIFE — function has a name (useful for stack traces/debugging)
(function chai(){
    // named IIFE — runs immediately, `chai` is not accessible outside
    console.log(`DB CONNECTED`);
})();
// chai()  // ❌ ReferenceError — `chai` only exists inside the IIFE

// Arrow function IIFE with a parameter
( (name) => {
    console.log(`DB CONNECTED TWO ${name}`);
} )('hitesh')
// 'hitesh' is passed as the argument for `name` immediately on invocation
