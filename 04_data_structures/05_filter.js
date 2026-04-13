// ============================================================
// CONCEPT: filter() — Array Method
// ============================================================
// filter() creates a NEW array containing only elements for which
// the callback returns true (truthy).
// The original array is NOT modified.
//
// SYNTAX:
//   const result = array.filter(callback)
//   const result = array.filter((item) => condition)
//
// RETURN VALUE:
//   A new array with all elements that passed the test.
//   Empty array [] if nothing matched.
//
// KEY DIFFERENCE from forEach:
//   forEach → returns undefined, used for side effects
//   filter  → returns a NEW filtered array, can be chained
//
// NOTE: Using forEach to manually push matching items is equivalent
// but more verbose — filter is the clean, functional way.
// ============================================================

// forEach equivalent (manual filter) — verbose, avoid this:
// const coding = ["js", "ruby", "java", "python", "cpp"]
// const values = coding.forEach( (item) => {
//     return item   // ❌ return inside forEach does nothing — forEach always returns undefined
// } )
// console.log(values);  // undefined

const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// filter with arrow function — returns only numbers > 4
// const newNums = myNums.filter( (num) => {
//     return num > 4
// } )

// Manual equivalent with forEach (less preferred):
// const newNums = []
// myNums.forEach( (num) => {
//     if (num > 4) {
//         newNums.push(num)
//     }
// } )
// console.log(newNums);  // [5, 6, 7, 8, 9, 10]


// ============================================================
// Filtering an array of objects — real-world use case
// ============================================================
const books = [
    { title: 'Book One',   genre: 'Fiction',     publish: 1981, edition: 2004 },
    { title: 'Book Two',   genre: 'Non-Fiction',  publish: 1992, edition: 2008 },
    { title: 'Book Three', genre: 'History',      publish: 1999, edition: 2007 },
    { title: 'Book Four',  genre: 'Non-Fiction',  publish: 1989, edition: 2010 },
    { title: 'Book Five',  genre: 'Science',      publish: 2009, edition: 2014 },
    { title: 'Book Six',   genre: 'Fiction',      publish: 1987, edition: 2010 },
    { title: 'Book Seven', genre: 'History',      publish: 1986, edition: 1996 },
    { title: 'Book Eight', genre: 'Science',      publish: 2011, edition: 2016 },
    { title: 'Book Nine',  genre: 'Non-Fiction',  publish: 1981, edition: 1989 },
]

// Filter: only History books
let userBooks = books.filter( (bk) => bk.genre === 'History')

// Filter with multiple conditions: History books published in 1995 or later
userBooks = books.filter( (bk) => {
    return bk.publish >= 1995 && bk.genre === "History"
})
console.log(userBooks);  // only Book Three (History, 1999)
