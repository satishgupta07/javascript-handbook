/*
  CONCEPT: Hoisting in JavaScript
  ============================================================
  Hoisting is a behaviour where variables and function declarations
  are MOVED (conceptually) to the top of their scope BEFORE code
  executes. This happens because of the MEMORY CREATION PHASE of
  the Execution Context.

  Execution Context has two phases:
    Phase 1 — Memory Creation:
      → Scans all code first
      → var variables: allocated memory, initialized to undefined
      → function declarations: entire function body stored in memory
      → let/const: allocated memory in a separate "block" space, NOT initialized

    Phase 2 — Code Execution:
      → Runs code line by line
      → Variables get their actual values
      → Functions get called

  RESULT OF HOISTING:
    - var variables: accessible before declaration → value is undefined
    - Function declarations: fully callable before they appear in code
    - Function expressions (var f = function(){}): only 'undefined' hoisted, not the function
    - let/const: hoisted but in Temporal Dead Zone → throws ReferenceError if accessed early
  ============================================================
*/

// ─── 1. var hoisting — accessible but undefined ──────────────
console.log(x);  // undefined  (NOT an error — memory was allocated in phase 1)
var x = 7;
console.log(x);  // 7

// ─── 2. Function declaration hoisting — fully callable ────────
getName();  // "Namaste JavaScript"  — works perfectly before the declaration
function getName() {
    console.log("Namaste JavaScript");
}
console.log(getName);  // f getName() { ... }  — full function in memory

// ─── 3. The key difference: declarations vs expressions ───────
/*
  Function DECLARATION → fully hoisted (whole body in memory)
  Function EXPRESSION   → only the variable is hoisted (as undefined)
*/

// ❌ Calling a function expression before its declaration
console.log(greet);   // undefined — var was hoisted, but not the function value
// greet();            // TypeError: greet is not a function
//                        because greet is still undefined at this point

var greet = function() {
    console.log("Hello!");
};
greet();  // "Hello!" — now it works, after assignment

// ─── 4. Arrow functions behave like function expressions ──────
// arrowFn();  // TypeError: arrowFn is not a function

var arrowFn = () => console.log("Arrow!");
arrowFn();  // "Arrow!"

// ─── 5. let and const — hoisted but NOT accessible ─────────────
/*
  let and const ARE hoisted, but into a separate memory area
  (not global/function scope). They live in the Temporal Dead Zone
  from the start of the block until the declaration line.
  Accessing them before declaration → ReferenceError.
*/
// console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 10;
console.log(a);  // 10

// ─── 6. Why hoisting exists — practical implication ───────────
/*
  In JavaScript, memory is prepared BEFORE execution. So the engine
  knows about all var variables and function declarations in the
  current scope even before running a single line.

  This is why:
    getName()  → works (function body fully stored)
    console.log(x) → undefined (var stored, but no value yet)
    console.log(let_var) → ReferenceError (stored but inaccessible — TDZ)

  Best practice: NEVER rely on hoisting. Always declare and
  initialize variables before using them. Declare functions above
  the code that calls them for readability.
*/

// ─── 7. Hoisting inside functions ────────────────────────────
/*
  Each function call creates its OWN execution context with its
  own memory creation phase. Variables declared inside a function
  are hoisted only within that function's scope.
*/
function outer() {
    console.log(inner);  // undefined — hoisted within outer's scope
    var inner = "found me";
    console.log(inner);  // "found me"
}
outer();

// inner is NOT hoisted into global scope — it's function-scoped
// console.log(inner);  // ReferenceError: inner is not defined

// ─── 8. Hoisting summary table ───────────────────────────────
/*
  Declaration type            | Hoisted? | Initial value in memory
  ────────────────────────────|──────────|─────────────────────────
  var variable                |  Yes     | undefined
  function declaration        |  Yes     | full function body
  function expression (var)   |  Yes*    | undefined (* var part only)
  let variable                |  Yes     | uninitialized (TDZ)
  const variable              |  Yes     | uninitialized (TDZ)
*/
