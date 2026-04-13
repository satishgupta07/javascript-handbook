// ============================================================
// CONCEPT: OOP — Object Literals & Constructor Functions
// ============================================================
// Object-Oriented Programming organises code around objects.
//
// OBJECT LITERAL — simplest way, creates one specific object:
//   const user = { name: "hitesh", greet() { ... } }
//   `this` inside a method refers to the object itself.
//
// CONSTRUCTOR FUNCTION — a blueprint to create MULTIPLE objects:
//   function User(name) { this.name = name }
//   const u1 = new User("hitesh")
//
// HOW `new` WORKS (4 steps):
//   1. Creates a brand new empty object {}
//   2. Sets `this` inside the function to that new object
//   3. Executes the constructor body (assigns properties)
//   4. Implicitly returns `this` (the new object)
//
// Each object created with `new` is called an INSTANCE.
// obj.constructor tells you which function created the object.
// ============================================================

// Object literal — one-off object with a method
const user = {
    username: "hitesh",
    loginCount: 8,
    signedIn: true,

    getUserDetails: function(){
        //console.log("Got user details from database");
        // console.log(`Username: ${this.username}`);
        console.log(this);   // `this` = the entire user object
    }
}

//console.log(user.username)
//console.log(user.getUserDetails());
// console.log(this);  // global `this` (empty {} in Node, window in browser)


// ============================================================
// Constructor function — reusable template for multiple objects
// ============================================================
function User(username, loginCount, isLoggedIn){
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn

    this.greeting = function(){
        console.log(`Welcome ${this.username}`);
    }

    return this   // explicit return (optional — `new` does this implicitly)
}

// `new` creates a fresh object for each call
// Without `new`, both calls share the same `this` (global) — bug!
const userOne = new User("hitesh", 12, true)
const userTwo = new User("ChaiAurCode", 11, false)

// .constructor shows which function built this object
console.log(userOne.constructor);   // [Function: User]
//console.log(userTwo);
