// ============================================================
// CONCEPT: Static Methods & Properties
// ============================================================
// A static method belongs to the CLASS itself, not to instances.
//
//   static methodName() { }
//
// CALLING:
//   ClassName.methodName()    ✅ called on the class
//   instance.methodName()     ❌ TypeError — not on instance
//
// WHY USE STATIC?
//   For utility/helper functions that don't need access to instance data.
//   e.g. factory methods, ID generators, utility calculations.
//
// INHERITANCE & STATIC:
//   Static methods ARE inherited by child classes.
//   So ChildClass.staticMethod() works if the parent has it.
//   But instances of the child STILL cannot call it.
// ============================================================

class User {
    constructor(username){
        this.username = username
    }

    // Instance method — available on every `new User(...)` object
    logMe(){
        console.log(`Username: ${this.username}`);
    }

    // Static method — belongs only to the User CLASS, not to instances
    static createId(){
        return `123`
    }
}

const hitesh = new User("hitesh")
// console.log(hitesh.createId())   // ❌ TypeError: hitesh.createId is not a function
//                                  // static methods are not on instances

// ============================================================
// Static methods are inherited by child classes
// ============================================================
class Teacher extends User {
    constructor(username, email){
        super(username)
        this.email = email
    }
}

const iphone = new Teacher("iphone", "i@phone.com")
// iphone.createId()  // ❌ still not on the instance

// But the class itself inherits it:
console.log(Teacher.createId());   // "123" — child class inherits parent's static method
console.log(User.createId());      // "123" — works on parent class too
