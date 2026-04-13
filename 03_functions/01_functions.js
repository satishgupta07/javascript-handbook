// ============================================================
// CONCEPT: Functions in JavaScript
// ============================================================
// A function is a reusable block of code.
//
// DECLARATION (hoisted — can be called before it's defined):
//   function name(params) { ... }
//
// PARAMETERS vs ARGUMENTS:
//   Parameters → placeholder names in the function definition
//   Arguments  → actual values passed when calling the function
//
// DEFAULT PARAMETERS:
//   function greet(name = "Guest") { ... }
//   If no argument is passed, the default value is used.
//
// REST PARAMETER (...args):
//   Collects all extra arguments into an array.
//   Must be the LAST parameter.
//   function sum(a, b, ...rest) { } → rest holds remaining args
//
// PASSING OBJECTS & ARRAYS:
//   Objects and arrays are passed by reference — mutations inside
//   the function affect the original. Access with dot notation.
// ============================================================

function sayMyName(){
    console.log("H");
    console.log("I");
    console.log("T");
    console.log("E");
    console.log("S");
    console.log("H");
}
// sayMyName()  // calling without () just references the function object


// ============================================================
// Return values — use return to send a value back to the caller
// ============================================================

// Without return the function logs but returns undefined:
// function addTwoNumbers(number1, number2){
//     console.log(number1 + number2);
// }

function addTwoNumbers(number1, number2){
    // let result = number1 + number2
    // return result
    return number1 + number2   // ← single-line return
}

const result = addTwoNumbers(3, 5)
// console.log("Result: ", result);  // 8


// ============================================================
// Default parameters — used when argument is not provided
// ============================================================
function loginUserMessage(username = "sam"){
    if(!username){
        console.log("PLease enter a username");
        return      // early return — exits function immediately, returns undefined
    }
    return `${username} just logged in`
}

// console.log(loginUserMessage("hitesh"))  // "hitesh just logged in"
// console.log(loginUserMessage())          // "sam just logged in" (default used)


// ============================================================
// Rest parameter (...) — gathers remaining args into an array
// ============================================================
function calculateCartPrice(val1, val2, ...num1){
    return num1   // num1 is an array of all args beyond val1, val2
}

// console.log(calculateCartPrice(200, 400, 500, 2000))
// → val1=200, val2=400, num1=[500, 2000]


// ============================================================
// Passing objects to functions
// ============================================================
const user = {
    username: "hitesh",
    price: 199
}

function handleObject(anyobject){
    console.log(`Username is ${anyobject.username} and price is ${anyobject.price}`);
}

// handleObject(user)               // pass a named object
handleObject({                       // pass an object literal directly
    username: "sam",
    price: 399
})


// ============================================================
// Passing arrays to functions
// ============================================================
const myNewArray = [200, 400, 100, 600]

function returnSecondValue(getArray){
    return getArray[1]   // access by index
}

// console.log(returnSecondValue(myNewArray));          // 400
console.log(returnSecondValue([200, 400, 500, 1000])); // 400
