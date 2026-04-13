// ============================================================
// CONCEPT: ES6 Classes — Syntactic Sugar over Constructor Functions
// ============================================================
// Classes are the modern, clean way to write constructor patterns.
// Under the hood, JS still uses prototype-based inheritance.
// A class is essentially a constructor function with a nicer syntax.
//
// SYNTAX:
//   class Name {
//     constructor(params) { this.prop = value }
//     methodName() { }    ← added to Name.prototype automatically
//   }
//   const instance = new Name(args)
//
// HOW IT WORKS BEHIND THE SCENES:
//   class User { constructor(...) {} methodA() {} }
//   is equivalent to:
//   function User(...) { this.prop = ... }
//   User.prototype.methodA = function() { ... }
//
// KEY POINT: Methods defined in a class body are placed on the
// PROTOTYPE, not copied onto each instance — saving memory.
// ============================================================

// ES6 Class syntax
class User {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password
    }

    // These methods are stored on User.prototype, not on each instance
    encryptPassword(){
        return `${this.password}abc`
    }
    changeUsername(){
        return `${this.username.toUpperCase()}`
    }
}

const chai = new User("chai", "chai@gmail.com", "123")

console.log(chai.encryptPassword());   // "123abc"
console.log(chai.changeUsername());    // "CHAI"


// ============================================================
// Behind the scene — what the class compiles to
// ============================================================
// The class above is exactly equivalent to this constructor + prototype code:

function UserOld(username, email, password){
    this.username = username;
    this.email = email;
    this.password = password
}

// Methods added to prototype — shared across all instances (efficient)
UserOld.prototype.encryptPassword = function(){
    return `${this.password}abc`
}
UserOld.prototype.changeUsername = function(){
    return `${this.username.toUpperCase()}`
}

const tea = new UserOld("tea", "tea@gmail.com", "123")

console.log(tea.encryptPassword());    // "123abc"
console.log(tea.changeUsername());     // "TEA"
