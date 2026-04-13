// ============================================================
// CONCEPT: Objects — Advanced (Nesting, Merging, Utility Methods, Destructuring)
// ============================================================
//
// CREATING OBJECTS:
//   {}            → object literal (shorthand)
//   new Object()  → constructor syntax (same result, less common)
//
// NESTED OBJECTS:
//   Properties can themselves be objects — access with chained dot notation
//   obj.level1.level2.property
//
// MERGING OBJECTS:
//   Object.assign(target, src1, src2) → copies src into target, mutates target
//   { ...obj1, ...obj2 }              → spread operator (preferred, creates new obj)
//   NOTE: { obj1, obj2 } just nests them, does NOT merge
//
// OBJECT UTILITY METHODS:
//   Object.keys(obj)    → array of property names
//   Object.values(obj)  → array of property values
//   Object.entries(obj) → array of [key, value] pairs
//   obj.hasOwnProperty('key') → true if obj has that property directly
//
// DESTRUCTURING:
//   const { key } = obj         → extracts key into variable named key
//   const { key: alias } = obj  → extracts key but names the variable alias
// ============================================================

// new Object() and {} are identical — use {} in practice
const tinderUser = new Object()
// const tinderUser = {}

tinderUser.id = "123abc"
tinderUser.name = "Sammy"
tinderUser.isLoggedIn = false

// console.log(tinderUser);

// ============================================================
// Nested objects — access deeply with chained dot notation
// ============================================================
const regularUser = {
    email: "some@gmail.com",
    fullname: {
        userfullname: {
            firstname: "hitesh",
            lastname: "choudhary"
        }
    }
}

// console.log(regularUser.fullname.userfullname.firstname); // "hitesh"

// ============================================================
// Merging objects
// ============================================================
const obj1 = {1: "a", 2: "b"}
const obj2 = {3: "c", 4: "d"}
const obj4 = {5: "e", 6: "f"}

// WRONG: nests instead of merging
// const obj3 = { obj1, obj2 }       // { obj1: {…}, obj2: {…} }

// Object.assign(target, ...sources) — merges into target (mutates target)
// const obj3 = Object.assign({}, obj1, obj2, obj4)

// Spread (preferred) — creates a new object with all properties combined
const obj3 = {...obj1, ...obj2}
// console.log(obj3);   // { '1': 'a', '2': 'b', '3': 'c', '4': 'd' }


// Arrays of objects — very common pattern (like database records)
const users = [
    { id: 1, email: "h@gmail.com" },
    { id: 1, email: "h@gmail.com" },
    { id: 1, email: "h@gmail.com" },
]
users[1].email  // access property of second object in the array


// ============================================================
// Object utility methods
// ============================================================
console.log(Object.keys(tinderUser));    // ["id", "name", "isLoggedIn"]
console.log(Object.values(tinderUser));  // ["123abc", "Sammy", false]
console.log(Object.entries(tinderUser)); // [["id","123abc"], ["name","Sammy"], ["isLoggedIn",false]]

// hasOwnProperty — checks if property belongs directly to the object (not inherited)
console.log(tinderUser.hasOwnProperty('isLoggedIn'));  // true


// ============================================================
// CONCEPT: Object Destructuring
// ============================================================
// Extract properties from an object into individual variables.
// Useful to avoid repetitive obj.prop access.
// ============================================================
const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "hitesh"
}

// course.courseInstructor  ← old way to access

// Destructuring with renaming: { originalKey: newVariableName } = obj
const {courseInstructor: instructor} = course

// console.log(courseInstructor);  // ❌ ReferenceError — original key is not a variable
console.log(instructor);           // "hitesh" — new variable name works
