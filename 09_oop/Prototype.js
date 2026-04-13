// ============================================================
// CONCEPT: Prototypes & Prototype Chain
// ============================================================
// Every JavaScript object has a hidden [[Prototype]] link to another
// object. When you access a property/method, JS first checks the
// object itself, then walks UP the prototype chain until found.
//
// PROTOTYPE CHAIN:
//   instance → Constructor.prototype → Object.prototype → null
//
// You can ADD methods to built-in prototypes (prototype extension):
//   Object.prototype.myMethod = function() {}  → available on ALL objects
//   Array.prototype.myMethod = function() {}   → available on ALL arrays
//   String.prototype.myMethod = function() {}  → available on ALL strings
//
//   ⚠️ Extending built-in prototypes is demonstrated here for learning,
//   but avoid it in production — it can conflict with other libraries
//   and future JS built-in methods.
//
// SETTING UP INHERITANCE between plain objects:
//   Old way:    Child.__proto__ = Parent        (direct proto assignment)
//   Modern way: Object.setPrototypeOf(Child, Parent)  (preferred)
//   Inline:     const obj = { __proto__: Parent }
// ============================================================

// let myName = "hitesh     "
// let mychannel = "chai     "
// console.log(myName.trueLength);  // custom method added below

let myHeros = ["thor", "spiderman"]

let heroPower = {
    thor: "hammer",
    spiderman: "sling",

    getSpiderPower: function(){
        console.log(`Spidy power is ${this.spiderman}`);
    }
}

// Extending Object.prototype — ALL objects get this method
Object.prototype.hitesh = function(){
    console.log(`hitesh is present in all objects`);
}

// Extending Array.prototype — ALL arrays get this method
Array.prototype.heyHitesh = function(){
    console.log(`Hitesh says hello`);
}

// heroPower.hitesh()   // works — object gets Object.prototype method
// myHeros.hitesh()     // works — array also inherits Object.prototype
// myHeros.heyHitesh()  // works — array gets Array.prototype method
// heroPower.heyHitesh() // ❌ TypeError — plain objects don't have Array.prototype


// ============================================================
// Prototype-based inheritance between plain objects
// ============================================================
const User = {
    name: "chai",
    email: "chai@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS assignment',
    fullTime: true,
    __proto__: TeachingSupport   // inline prototype assignment (old way)
}

Teacher.__proto__ = User  // Teacher now inherits from User (old way)

// Modern preferred syntax: Object.setPrototypeOf(child, parent)
Object.setPrototypeOf(TeachingSupport, Teacher)
// Now: TASupport → TeachingSupport → Teacher → User → Object.prototype


// ============================================================
// Extending String.prototype with a custom method
// ============================================================
let anotherUsername = "ChaiAurCode     "

// Add a custom trueLength method to ALL strings
String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`);  // trim then measure
}

anotherUsername.trueLength()  // "ChaiAurCode     " → True length is: 11
"hitesh".trueLength()
"iceTea".trueLength()
