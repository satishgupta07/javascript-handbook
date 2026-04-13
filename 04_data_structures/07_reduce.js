// ============================================================
// CONCEPT: reduce() — Array Accumulation Method
// ============================================================
// reduce() processes an array down to a SINGLE value by running
// a callback on each element, carrying a running "accumulator".
//
// SYNTAX:
//   array.reduce((accumulator, currentValue) => {
//     return updatedAccumulator
//   }, initialValue)
//
// PARAMETERS:
//   accumulator   → running result (starts as initialValue)
//   currentValue  → current element being processed
//   initialValue  → starting value for the accumulator (ALWAYS provide this)
//
// USE CASES:
//   Sum of numbers, product, flattening arrays,
//   counting occurrences, building objects from arrays
//
// WHY initialValue matters:
//   Without it, reduce uses the first element as initial accumulator
//   — this can cause bugs with empty arrays (throws TypeError).
//   Always provide 0, [], or {} as appropriate.
// ============================================================

const myNums = [1, 2, 3]

// Verbose form — shows accumulator building up step by step
// const myTotal = myNums.reduce(function (acc, currval) {
//     console.log(`acc: ${acc} and currval: ${currval}`);
//     // iteration 1: acc=0, currval=1 → return 1
//     // iteration 2: acc=1, currval=2 → return 3
//     // iteration 3: acc=3, currval=3 → return 6
//     return acc + currval
// }, 0)

// Concise arrow function form
const myTotal = myNums.reduce( (acc, curr) => acc+curr, 0)

console.log(myTotal);  // 6


// ============================================================
// Real-world use case: shopping cart total
// ============================================================
const shoppingCart = [
    { itemName: "js course",          price: 2999  },
    { itemName: "py course",          price: 999   },
    { itemName: "mobile dev course",  price: 5999  },
    { itemName: "data science course",price: 12999 },
]

// Accumulate the price of every item into a running total
// acc starts at 0, each iteration adds item.price
const priceToPay = shoppingCart.reduce((acc, item) => acc + item.price, 0)

console.log(priceToPay);  // 22996
