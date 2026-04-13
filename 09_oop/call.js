// ============================================================
// CONCEPT: Function.prototype.call() — Borrowing Functions
// ============================================================
// .call() lets you invoke a function with a specific `this` value.
// This allows one function to "borrow" and reuse another function's
// logic without duplicating code.
//
// SYNTAX:
//   functionName.call(thisArg, arg1, arg2, ...)
//   thisArg → what `this` will refer to inside the function
//   arg1... → normal arguments passed to the function
//
// USE CASE HERE:
//   createUser() needs the username-setting logic from SetUsername().
//   Instead of duplicating code, it uses SetUsername.call(this, username)
//   which runs SetUsername but with createUser's `this` context,
//   so the username gets set on the new createUser instance.
//
// Related methods:
//   .apply(thisArg, [argsArray]) → same as call but args as array
//   .bind(thisArg)               → returns a NEW function with fixed `this`
//                                  (does not invoke immediately — see bind.html)
// ============================================================

function SetUsername(username){
    // Imagine complex DB calls or validation here
    this.username = username
    console.log("called");
}

function createUser(username, email, password){
    // Call SetUsername with THIS function's `this` context
    // so that `this.username` is set on the createUser instance, not globally
    SetUsername.call(this, username)

    this.email = email
    this.password = password
}

const chai = new createUser("chai", "chai@fb.com", "123")
console.log(chai);
// { username: 'chai', email: 'chai@fb.com', password: '123' }
// SetUsername's logic ran, but `this.username` landed on `chai` instance
