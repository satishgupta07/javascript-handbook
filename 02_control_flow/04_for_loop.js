// ============================================================
// CONCEPT: for Loop
// ============================================================
// The classic for loop — best when you know the number of iterations.
//
// SYNTAX:
//   for (initialisation; condition; update) { body }
//   ↑ runs once     ↑ checked before each iteration
//                                    ↑ runs after each iteration
//
// KEY POINTS:
//   - Variables declared with let inside the for block are block-scoped
//   - Nested for loops are used for 2D patterns (like multiplication tables)
//
// LOOP CONTROL:
//   break    → exit the loop immediately
//   continue → skip the current iteration, jump to next one
// ============================================================

// Basic for loop — i goes from 0 to 10 (inclusive)
for (let i = 0; i <= 10; i++) {
    const element = i;
    if (element == 5) {
        // console.log("5 is best number");
    }
    // console.log(element);
}

// console.log(element);  // ❌ ReferenceError — element is block-scoped to the for loop


// ============================================================
// Nested for loop — creates a multiplication table
// ============================================================
for (let i = 1; i <= 10; i++) {
    // console.log(`Outer loop value: ${i}`);
    for (let j = 1; j <= 10; j++) {
        // console.log(`Inner loop value ${j} and inner loop ${i}`)
        //console.log(i + '*' + j + ' = '+ i*j);  // e.g. "2*3 = 6"
    }
    //console.log("**********************************")
}


// Iterating an array with for loop
let myArray = ["flash", "batman", "superman"]
//console.log(myArray.length);
for (let index = 0; index < myArray.length; index++) {
    const element = myArray[index];
    //console.log(element);
}


// ============================================================
// break — exits the loop entirely when condition is met
// ============================================================
for (let index = 1; index <= 20; index++) {
    if (index == 5) {
        console.log(`Detected 5`);
        break           // ← stops the loop at 5, skips 6–20
    }
   console.log(`Value of i is ${index}`);  // prints 1,2,3,4 then "Detected 5" then stops
}

// ============================================================
// continue — skips only the current iteration
// ============================================================
for (let index = 1; index <= 10; index++) {
    if (index == 5) {
        console.log(`Detected 5`);
        continue        // ← skips the rest of this iteration, continues with 6
    }
   console.log(`Value of i is ${index}`);  // prints 1,2,3,4 then skips 5, prints 6–10
}
