// ============================================================
// CONCEPT: forEach — Array Iteration Method
// ============================================================
// forEach executes a callback function once for each element.
// It is a higher-order function — it takes a function as argument.
//
// SYNTAX:
//   array.forEach(callback)
//   array.forEach(function(item, index, array) { })
//   array.forEach((item, index, array) => { })
//
// CALLBACK PARAMETERS (all optional):
//   item   → current element value
//   index  → current element's index
//   array  → the original array itself
//
// KEY DIFFERENCE from map/filter:
//   forEach returns UNDEFINED — it cannot be chained
//   Use forEach only for side effects (logging, DOM updates, etc.)
//   Use map() when you need a new transformed array
// ============================================================

const coding = ["js", "ruby", "java", "python", "cpp"]

// forEach with anonymous function
// coding.forEach( function (val){
//     console.log(val);
// } )

// forEach with arrow function (shorter)
// coding.forEach( (item) => {
//     console.log(item);
// } )

// forEach with a named callback function — function is passed by reference
// function printMe(item){
//     console.log(item);
// }
// coding.forEach(printMe)   // pass function reference, not printMe()

// forEach with all three parameters: item, index, array
// coding.forEach( (item, index, arr)=> {
//     console.log(item, index, arr);
// } )


// ============================================================
// forEach on an array of objects
// ============================================================
// Very common pattern — iterate over an array of records
const myCoding = [
    {
        languageName: "javascript",
        languageFileName: "js"
    },
    {
        languageName: "java",
        languageFileName: "java"
    },
    {
        languageName: "python",
        languageFileName: "py"
    },
]

// Access specific properties of each object in the callback
myCoding.forEach( (item) => {
    console.log(item.languageName);  // "javascript", "java", "python"
} )
