/*
  CONCEPT: Temporal Dead Zone (TDZ) & Block Scope & Shadowing
  ============================================================
  Three closely related topics that explain how let and const
  behave differently from var.

  TEMPORAL DEAD ZONE (TDZ)
    The time between when a let/const variable is HOISTED
    (at the start of its scope) and when it is INITIALIZED
    (at the line where it's declared with a value).
    Accessing the variable during this window → ReferenceError.

  BLOCK SCOPE
    A block is code inside { }. let and const are BLOCK-SCOPED —
    they live only within the { } they were declared in.
    var is NOT block-scoped — it leaks out to the function/global scope.

  SHADOWING
    When a variable inside a block/function has the same name as
    one outside, the inner one "shadows" (hides) the outer one
    within that block.
  ============================================================
*/

// ══════════════════════════════════════════════════════════════
//  T E M P O R A L   D E A D   Z O N E
// ══════════════════════════════════════════════════════════════

// ─── 1. var vs let hoisting behaviour ────────────────────────
// Both are hoisted — but let is kept in an inaccessible "script" memory space

// console.log(a);  // ReferenceError: Cannot access 'a' before initialization
// console.log(b);  // undefined  (var is safely accessible — value just not set yet)

let a = 10;
var b = 15;

console.log(a);           // 10
console.log(b);           // 15
console.log(window?.b);   // 15  — var goes onto the global window object
// console.log(window?.a); // undefined — let is NOT on window, it's in "script" scope

// ─── 2. TDZ in action ────────────────────────────────────────
/*
  Everything from the top of the block to "let x = ..." is the TDZ for x.
  During TDZ: variable exists in memory but has NO value → ReferenceError.
*/
function tdzDemo() {
    // ← TDZ for 'count' starts here
    // console.log(count);  // ReferenceError: Cannot access 'count' before initialization
    let count = 0;           // ← TDZ ends here — count is now initialized
    console.log(count);      // 0
}
tdzDemo();

// ─── 3. let vs const strictness ──────────────────────────────
let c;        // allowed — declare now, assign later
c = 10;
console.log(c);  // 10

// const d;        // SyntaxError: Missing initializer in const declaration
// const MUST be declared and initialized in the same statement
const d = 42;     // ← only valid form for const

// const d = 50;   // TypeError: Assignment to constant variable
// const cannot be reassigned after initialization

// ─── 4. Duplicate declarations ───────────────────────────────
// let a = 100;   // SyntaxError: Identifier 'a' has already been declared
// var b = 200;   // also rejected at parse time if 'b' was let-declared in same scope

// ─── 5. Error types quick reference ──────────────────────────
/*
  ReferenceError: Cannot access 'x' before initialization
    → x is in TDZ (declared with let/const but not initialized yet)

  ReferenceError: x is not defined
    → x was never declared anywhere in scope

  SyntaxError: Identifier 'x' has already been declared
    → trying to re-declare a let/const variable

  SyntaxError: Missing initializer in const declaration
    → const without = value on the same line

  TypeError: Assignment to constant variable
    → trying to reassign a const
*/

// ══════════════════════════════════════════════════════════════
//  B L O C K   S C O P E
// ══════════════════════════════════════════════════════════════

// ─── 6. var leaks out of blocks, let/const stay inside ────────
{
    var leaking = "I escape the block";  // goes to global/function scope
    let trapped = "I stay inside";       // only accessible within { }
    const alsoTrapped = "Me too";
}

console.log(leaking);      // "I escape the block"
// console.log(trapped);   // ReferenceError: trapped is not defined
// console.log(alsoTrapped); // ReferenceError

// ─── 7. Block scope with if/for ───────────────────────────────
for (var i = 0; i < 3; i++) {}
console.log(i);  // 3 — var leaks out of the for loop

for (let j = 0; j < 3; j++) {}
// console.log(j);  // ReferenceError — let stays inside the for loop

// ══════════════════════════════════════════════════════════════
//  S H A D O W I N G
// ══════════════════════════════════════════════════════════════

// ─── 8. var shadowing — modifies the outer variable ──────────
var outer = 100;
{
    var outer = 10;  // this is the SAME variable — overwrites it!
    console.log(outer);  // 10
}
console.log(outer);  // 10  ← outer was modified (not just shadowed)

// ─── 9. let/const shadowing — creates an independent copy ─────
let score = 100;
{
    let score = 20;    // independent variable — different memory space
    console.log(score); // 20  ← inner block's score
}
console.log(score);   // 100  ← outer scope's score unchanged

// ─── 10. Shadowing in functions ───────────────────────────────
const MAX = 100;

function example() {
    const MAX = 10;      // shadows outer MAX — completely independent
    console.log(MAX);    // 10  ← function's own MAX
}
example();
console.log(MAX);        // 100  ← outer MAX untouched

// ─── 11. Illegal Shadowing ────────────────────────────────────
/*
  You cannot shadow a let variable with var in the same scope level.
  The reason: var is function-scoped and would try to bleed into the
  outer scope where 'a' is already declared as let — a conflict.
*/
let legalCheck = 20;

// ❌ ILLEGAL — var bleeding into outer scope where let exists
// {
//     var legalCheck = 20;  // SyntaxError: Identifier 'legalCheck' has already been declared
// }

// ✅ LEGAL — let can shadow let
{
    let legalCheck = 999;   // fine — separate block scope
    console.log(legalCheck); // 999
}
console.log(legalCheck);     // 20

// ✅ LEGAL — var inside a function doesn't bleed into outer scope
function isolated() {
    var legalCheck = 99;   // fine — function creates its own scope
    console.log(legalCheck); // 99
}
isolated();
console.log(legalCheck);  // 20 — unaffected

// ─── 12. Best practices summary ──────────────────────────────
/*
  - Prefer const for everything by default
  - Use let when you genuinely need to reassign
  - Never use var in modern code
  - Declare variables at the top of their block to shrink TDZ to zero
  - Name variables clearly to avoid accidental shadowing
*/
