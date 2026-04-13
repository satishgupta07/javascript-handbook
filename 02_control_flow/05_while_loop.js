// ============================================================
// CONCEPT: while Loop & do...while Loop
// ============================================================
//
// WHILE LOOP:
//   Checks condition BEFORE executing the body.
//   If the condition is false from the start, body never runs.
//
//   while (condition) { body }
//
// DO...WHILE LOOP:
//   Executes body FIRST, then checks the condition.
//   Body always runs AT LEAST ONCE, even if condition is false.
//
//   do { body } while (condition)
//
// USE WHEN:
//   Use while/do-while when the number of iterations is unknown
//   and depends on a runtime condition (e.g. user input, stream data).
//   Use for loop when the count is known in advance.
// ============================================================

// while loop — increments by 2 each iteration
let index = 0
while (index <= 10) {
    //console.log(`Value of index is ${index}`);
    index = index + 2   // must update index or it loops forever (infinite loop)
}

// while loop iterating an array
let myArray = ['flash', 'batman', 'superman']

let arr = 0
while(arr < myArray.length) {
    //console.log(`Value is ${myArray[arr]}`)
    arr = arr + 1
}


// ============================================================
// do...while — body runs at least once
// ============================================================
// Here score starts at 11, which already fails (score <= 10).
// But do...while runs the body ONCE before checking the condition.
let score = 11

do {
    console.log(`Score is ${score}`)   // prints "Score is 11" — runs once despite failing condition
    score++;
} while (score <= 10);   // condition is false immediately, so loop stops after first run
