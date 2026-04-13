/*
  CONCEPT: Set and Map
  ============================================================
  ES6 introduced two specialized collection types that solve
  problems where plain arrays and objects fall short.

  SET
    → Stores UNIQUE values of any type — duplicates are silently ignored
    → Maintains insertion order
    → No index-based access (it's not an array)
    → Core methods: add(), has(), delete(), clear(), size, forEach()

  MAP
    → Stores key-value pairs where KEYS CAN BE ANY TYPE
    → Unlike plain objects ({}), keys aren't limited to strings/Symbols
    → Maintains insertion order
    → Core methods: set(), get(), has(), delete(), clear(), size, forEach()

  WHEN TO USE WHAT:
    Set    → removing duplicates, membership testing, tracking unique items
    Map    → dictionary/lookup table, non-string keys, ordered key-value pairs
    Object → static config, JSON-shaped data, prototype methods needed
  ============================================================
*/

// ══════════════════════════════════════════════════════════════
//  S E T
// ══════════════════════════════════════════════════════════════

// ─── 1. Creating a Set ───────────────────────────────────────
const fruits = new Set(["apple", "banana", "apple", "mango", "banana"]);
console.log(fruits);        // Set(3) { 'apple', 'banana', 'mango' }
console.log(fruits.size);   // 3 — duplicates silently removed on creation

// ─── 2. Adding and checking values ───────────────────────────
fruits.add("cherry");
fruits.add("apple");   // ignored — already exists

console.log(fruits.has("banana"));  // true
console.log(fruits.has("grape"));   // false

// ─── 3. Deleting values ──────────────────────────────────────
fruits.delete("banana");
console.log(fruits.size);   // 3  (cherry added, banana removed, apple dup ignored)

// ─── 4. Iterating a Set ──────────────────────────────────────
fruits.forEach(fruit => console.log(fruit));

for (const fruit of fruits) {
    console.log(fruit);
}

// ─── 5. The most common use: remove duplicates from an array ──
const nums = [1, 2, 3, 2, 1, 4, 3, 5];
const unique = [...new Set(nums)];   // spread Set back into an array
console.log(unique);  // [1, 2, 3, 4, 5]

// Also works with strings
const tags = ["js", "css", "js", "html", "css", "js"];
const uniqueTags = [...new Set(tags)];
console.log(uniqueTags);  // ["js", "css", "html"]

// ─── 6. Set operations (union, intersection, difference) ──────
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union — all elements from both sets
const union = new Set([...setA, ...setB]);
console.log([...union]);  // [1, 2, 3, 4, 5, 6]

// Intersection — only elements present in BOTH
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log([...intersection]);  // [3, 4]

// Difference — elements in A but NOT in B
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log([...difference]);  // [1, 2]


// ══════════════════════════════════════════════════════════════
//  M A P
// ══════════════════════════════════════════════════════════════

// ─── 7. Creating a Map ───────────────────────────────────────
const capitals = new Map();
capitals.set("India",  "New Delhi");
capitals.set("France", "Paris");
capitals.set("Japan",  "Tokyo");

console.log(capitals.get("India"));    // "New Delhi"
console.log(capitals.has("Germany"));  // false
console.log(capitals.size);            // 3

// ─── 8. Map with non-string keys (impossible with plain objects) ──
const userMap = new Map();

const alice = { id: 1, name: "Alice" };
const bob   = { id: 2, name: "Bob"   };

userMap.set(alice, { role: "admin",  score: 99 });
userMap.set(bob,   { role: "viewer", score: 45 });
userMap.set(42,    { role: "guest",  score: 0  });  // number as key

console.log(userMap.get(alice));  // { role: "admin", score: 99 }
console.log(userMap.get(bob));    // { role: "viewer", score: 45 }
console.log(userMap.get(42));     // { role: "guest", score: 0 }

// ─── 9. Iterating a Map ──────────────────────────────────────
capitals.forEach((value, key) => {
    console.log(`${key} → ${value}`);
});

for (const [country, capital] of capitals) {
    console.log(`${country}: ${capital}`);
}

// Iterate just keys or just values
for (const country of capitals.keys())   console.log(country);
for (const capital of capitals.values()) console.log(capital);
for (const entry  of capitals.entries()) console.log(entry);

// ─── 10. Converting between Map, Object, and Array ────────────
// Object → Map
const objToMap = new Map(Object.entries({ x: 1, y: 2, z: 3 }));
console.log(objToMap.get("x"));  // 1

// Map → Object (only works if all keys are strings)
const mapToObj = Object.fromEntries(capitals);
console.log(mapToObj);  // { India: "New Delhi", France: "Paris", Japan: "Tokyo" }

// Map → Array of [key, value] pairs
const mapToArr = [...capitals];
console.log(mapToArr[0]);  // ["India", "New Delhi"]

// ─── 11. Practical: word frequency counter ───────────────────
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const freq = new Map();

for (const word of words) {
    freq.set(word, (freq.get(word) ?? 0) + 1);
    // ?? 0 handles the first occurrence — get() returns undefined if key not found
}

console.log(freq);  // Map { apple: 3, banana: 2, cherry: 1 }

// Sort by frequency (highest first)
const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
console.log(sorted);  // [["apple", 3], ["banana", 2], ["cherry", 1]]

// ─── 12. Map vs Object — key differences ─────────────────────
/*
  Feature                Map           Object
  ─────────────────────────────────────────────────────────────
  Key types              Any           String / Symbol only
  Insertion order        Guaranteed    Mostly (not spec-guaranteed)
  Size                   .size         Object.keys(o).length
  Default keys           None          Has prototype keys
  Performance (large)    Better        Worse
  JSON serializable      No (directly) Yes

  Rule of thumb:
    Use Map when keys aren't strings, or when you're doing lookups
    at scale. Use Object for plain config/data structures.
*/
