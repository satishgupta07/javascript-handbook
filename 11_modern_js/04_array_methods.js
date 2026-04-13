/*
  CONCEPT: Essential Array Methods — find, findIndex, some, every, flatMap, at
  ============================================================
  These methods complete the "functional array toolkit" alongside
  filter(), map(), and reduce() that are already covered in
  05_iterations/.

  METHOD REFERENCE:
    find(fn)          → first element where fn is true (or undefined)
    findIndex(fn)     → index of first match (or -1)
    findLast(fn)      → last element where fn is true
    findLastIndex(fn) → index of last match (or -1)
    some(fn)          → true if AT LEAST ONE element passes fn  (OR logic)
    every(fn)         → true if ALL elements pass fn            (AND logic)
    flatMap(fn)       → map() then flatten one level deep
    at(n)             → element at index n; negative n counts from end

  All of these are non-mutating — they return new values without
  modifying the original array.
  ============================================================
*/

const products = [
    { id: 1, name: "Laptop",   price: 75000, inStock: true  },
    { id: 2, name: "Phone",    price: 35000, inStock: false },
    { id: 3, name: "Tablet",   price: 45000, inStock: true  },
    { id: 4, name: "Monitor",  price: 25000, inStock: true  },
    { id: 5, name: "Keyboard", price: 5000,  inStock: false },
];

// ─── 1. find() — get the first matching element ───────────────
// Returns the element itself (not an array, not an index)
const affordable = products.find(p => p.price < 40000 && p.inStock);
console.log(affordable);
// { id: 4, name: "Monitor", price: 25000, inStock: true }

const missing = products.find(p => p.price > 1000000);
console.log(missing);  // undefined — no match

// Contrast with filter() — find() returns ONE item, filter() returns an array
const affordableArr = products.filter(p => p.price < 40000 && p.inStock);
console.log(affordableArr);  // [{ Monitor... }]  ← always an array

// ─── 2. findIndex() — get the position of the first match ─────
const tabletIdx = products.findIndex(p => p.name === "Tablet");
console.log(tabletIdx);  // 2

// Common pattern: find the index, then update in place
if (tabletIdx !== -1) {
    products[tabletIdx] = { ...products[tabletIdx], inStock: false };
}

const notFound = products.findIndex(p => p.price > 1000000);
console.log(notFound);  // -1

// ─── 3. findLast() and findLastIndex() ───────────────────────
// Searches from the end of the array backward
const lastInStock = products.findLast(p => p.inStock);
console.log(lastInStock?.name);  // "Monitor" (last one still in stock)

const lastInStockIdx = products.findLastIndex(p => p.inStock);
console.log(lastInStockIdx);  // 3

// ─── 4. some() — at least one match? ─────────────────────────
// Returns boolean. Short-circuits — stops as soon as a match is found.
const hasExpensive  = products.some(p => p.price > 50000);
console.log(hasExpensive);   // true (Laptop is 75000)

const hasOutOfStock = products.some(p => !p.inStock);
console.log(hasOutOfStock);  // true

// ─── 5. every() — all match? ─────────────────────────────────
// Returns boolean. Short-circuits — stops as soon as a failure is found.
const allInStock     = products.every(p => p.inStock);
console.log(allInStock);      // false

const allPositive    = products.every(p => p.price > 0);
console.log(allPositive);     // true

// ─── 6. some() vs every() mental model ───────────────────────
/*
  Think of it as:
    some()  → OR gate  — any true makes the whole thing true
    every() → AND gate — any false makes the whole thing false

  Edge cases with empty arrays:
    [].some(fn)   → false  (vacuously — nothing satisfies)
    [].every(fn)  → true   (vacuously — nothing violates)
*/
console.log([].some(x => x > 0));   // false
console.log([].every(x => x > 0));  // true

// ─── 7. flatMap() — map + flatten in one step ────────────────
/*
  flatMap(fn) is equivalent to arr.map(fn).flat(1)
  but more efficient. Use it when each element should produce
  multiple output elements.
*/
const sentences = ["Hello world", "Chai aur JavaScript", "Learn to code"];

// Split each sentence into individual words
const words = sentences.flatMap(s => s.split(" "));
console.log(words);
// ["Hello", "world", "Chai", "aur", "JavaScript", "Learn", "to", "code"]

// Compare: map() alone creates nested arrays
const nested = sentences.map(s => s.split(" "));
console.log(nested);
// [["Hello", "world"], ["Chai", "aur", "JavaScript"], ["Learn", "to", "code"]]

// flatMap to expand one-to-many relationships
const orders = [
    { customer: "Alice", items: ["Book", "Pen"] },
    { customer: "Bob",   items: ["Laptop"] },
    { customer: "Carol", items: ["Mouse", "Keyboard", "Monitor"] },
];

const allItems = orders.flatMap(o => o.items);
console.log(allItems);
// ["Book", "Pen", "Laptop", "Mouse", "Keyboard", "Monitor"]

// flatMap also lets you filter AND transform in one pass:
// return [] to skip, return [value] to include
const expensiveNames = products.flatMap(p =>
    p.price > 40000 ? [p.name] : []  // skip cheap products
);
console.log(expensiveNames);  // ["Laptop", "Tablet"]  (after Tablet update above: may vary)

// ─── 8. at() — modern index access ──────────────────────────
const arr = [10, 20, 30, 40, 50];

console.log(arr.at(0));   // 10  — same as arr[0]
console.log(arr.at(2));   // 30
console.log(arr.at(-1));  // 50  — last element
console.log(arr.at(-2));  // 40  — second from last

// Before at(), accessing the last element was:
console.log(arr[arr.length - 1]);  // 50 — verbose
console.log(arr.at(-1));           // 50 — clean

// at() also works on strings
const str = "JavaScript";
console.log(str.at(0));   // "J"
console.log(str.at(-1));  // "t"

// ─── 9. Which method to use? — decision guide ─────────────────
/*
  Goal                                  Method
  ──────────────────────────────────────────────────────────────
  Get the first matching element        find()
  Get the last matching element         findLast()
  Get the index of a match              findIndex() / findLastIndex()
  Check if ANY element matches          some()
  Check if ALL elements match           every()
  Transform each element (1-to-1)       map()
  Keep only matching elements           filter()
  Accumulate into one value             reduce()
  Transform each element (1-to-many)    flatMap()
  Access last/nth-from-end element      at()
*/
