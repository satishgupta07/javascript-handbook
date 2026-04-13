// ============================================================
// CONCEPT: Class Inheritance — extends & super
// ============================================================
// Inheritance lets a child class reuse properties and methods
// from a parent class, while adding its own specific behaviour.
//
// SYNTAX:
//   class Child extends Parent { }
//
// `super()`:
//   Must be called inside the child's constructor BEFORE using `this`.
//   It calls the parent's constructor to initialise inherited properties.
//
// METHOD INHERITANCE:
//   Child instances can call methods defined on the parent class.
//   Child can also define its own additional methods.
//
// instanceof:
//   chai instanceof User    → true  (chai was made from Teacher which extends User)
//   chai instanceof Teacher → true
//   Used to check if an object is an instance of a class (or its parents).
// ============================================================

// Parent class
class User {
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`USERNAME is ${this.username}`);
    }
}

// Child class — inherits everything from User, adds email + password + addCourse()
class Teacher extends User {
    constructor(username, email, password){
        super(username)        // ← MUST call super() first to set this.username via User
        this.email = email
        this.password = password
    }

    addCourse(){
        console.log(`A new course was added by ${this.username}`);
        // `this.username` works because super() initialised it
    }
}

const chai = new Teacher("chai", "chai@teacher.com", "123")

chai.logMe()    // "USERNAME is chai" — inherited from User, works on Teacher instance

const masalaChai = new User("masalaChai")
masalaChai.logMe()  // "USERNAME is masalaChai" — plain User instance

// instanceof — checks if object was created from a class (or its ancestors)
console.log(chai instanceof User);    // true — Teacher extends User
