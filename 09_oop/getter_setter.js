// ============================================================
// CONCEPT: Getters & Setters in Classes
// ============================================================
// Getters and setters let you intercept reading and writing
// of object properties — adding computed values or validation.
//
// get propertyName() { return ... }   → called when you READ  obj.property
// set propertyName(value) { ... }     → called when you WRITE obj.property = val
//
// NAMING CONVENTION with underscore:
//   When a class has both a getter/setter AND a constructor for the
//   same property (e.g. email), they would clash.
//   Solution: store the actual value in `this._email` (underscore prefix)
//   and expose it through get/set without the underscore.
//   The underscore signals "internal/private — don't access directly".
//
// HOW IT WORKS:
//   constructor sets  this._email = value  (via the setter)
//   getter  returns   this._email          (with any transformation)
//   setter  assigns   this._email = value
// ============================================================

class User {
    constructor(email, password){
        // These assignments CALL the setters defined below
        this.email = email;      // → calls set email(value)
        this.password = password // → calls set password(value)
    }

    // Getter — intercepts read access to .email
    // Returns the stored _email in UPPERCASE
    get email(){
        return this._email.toUpperCase()
    }
    // Setter — intercepts write access to .email
    // Stores the value in _email to avoid infinite loop
    set email(value){
        this._email = value   // store in _email, not email (would loop forever)
    }

    // Getter — appends "hitesh" to the password (e.g. masking/transforming)
    get password(){
        return `${this._password}hitesh`
    }

    // Setter — stores the raw password in _password
    set password(value){
        this._password = value
    }
}

const hitesh = new User("h@hitesh.ai", "abc")
console.log(hitesh.email);     // "H@HITESH.AI" — getter returns uppercased value
