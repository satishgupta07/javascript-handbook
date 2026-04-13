// ============================================================
// CONCEPT: Scope in JavaScript
// ============================================================
// Scope determines where a variable is accessible.
//
//  BLOCK SCOPE (let, const):
//    Variables declared with let/const inside { } are only
//    accessible within that block.
//
//  FUNCTION SCOPE (var):
//    var ignores block boundaries — it leaks out of if/for blocks
//    but stays within its enclosing function.
//
//  GLOBAL SCOPE:
//    Variables declared outside any function/block are global.
//
//  LEXICAL SCOPE (Closure foundation):
//    Inner functions can access variables from outer functions.
//    Outer functions CANNOT access variables from inner functions.
//    The scope is determined by WHERE code is written, not where it runs.
//
// HOISTING:
//    Function declarations are hoisted (moved to top) — can be called
//    before they are written in the file.
//    Variables declared with const/let are NOT usable before declaration.
//    var is hoisted but initialized as undefined (avoid this behaviour).
// ============================================================

var c = 300   // var — function/global scoped
let a = 300   // let — block scoped
if (true) {
    let a = 10    // NEW variable 'a' — only exists inside this if block
    const b = 20  // block scoped — only inside this if block
    var c = 30    // SAME 'c' as above — var ignores block, overwrites outer c
    console.log("INNER: ", a);  // 10 — inner a
}

// console.log(a);  // 300 — outer a is unchanged (let is block-scoped)
// console.log(b);  // ❌ ReferenceError — b is not accessible outside the block
console.log(c);     // 30 — var leaked out of the if block and overwrote outer c


// ============================================================
// LEXICAL SCOPE — inner functions access outer variables
// ============================================================
function one(){
    const username = "hitesh"  // lives in one()'s scope

    function two(){
        const website = "youtube"  // lives in two()'s scope
        console.log(username);     // ✅ inner can access outer's username
    }
    // console.log(website);  // ❌ ReferenceError — outer cannot access inner's variable

    two()
}
one()


// Nested block scopes — same lexical scope rule applies
if (true) {
    const username = "hitesh"
    if (username === "hitesh") {
        const website = " youtube"
        console.log(username + website);  // ✅ inner block can access outer block's username
    }
    // console.log(website);  // ❌ ReferenceError — website is scoped to inner if
}

// console.log(username);  // ❌ ReferenceError — username is block-scoped


// ============================================================
// HOISTING — function declarations vs function expressions
// ============================================================

// ✅ Function DECLARATION — can be called BEFORE it's defined (hoisted to top)
console.log(addone(5))     // 6 — works! Declaration is hoisted

function addone(num){
    return num + 1
}


// ❌ Function EXPRESSION — NOT hoisted, cannot be called before this line
// addTwo(5)  // ❌ TypeError: addTwo is not a function (it's undefined at this point)
const addTwo = function(num){
    return num + 2
}
