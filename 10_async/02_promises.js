// ============================================================
// CONCEPT: Promises & Async JavaScript
// ============================================================
// A Promise represents a value that may be available NOW,
// in the FUTURE, or NEVER (error).
//
// A Promise is in one of three states:
//   pending   → initial state, operation not finished yet
//   fulfilled → operation succeeded, resolve() was called
//   rejected  → operation failed,   reject() was called
//
// CREATING a promise:
//   new Promise(function(resolve, reject) { ... })
//   Call resolve(value) on success, reject(reason) on failure.
//
// CONSUMING a promise:
//   .then(fn)     → runs when resolved (receives resolved value)
//   .catch(fn)    → runs when rejected (receives error reason)
//   .finally(fn)  → runs ALWAYS, whether resolved or rejected
//
// CHAINING:
//   .then() returns a new promise — can be chained.
//   Return a value inside .then() to pass it to the next .then().
//
// ASYNC / AWAIT (syntactic sugar over Promises):
//   async function — always returns a promise
//   await          — pauses execution inside async function until
//                    promise resolves (cleaner than .then() chains)
//   Must use try/catch with await to handle errors.
// ============================================================

// Basic promise — resolves after 1 second
const promiseOne = new Promise(function(resolve, reject){
    // Async task: DB calls, network requests, cryptography, etc.
    setTimeout(function(){
        console.log('Async task is compelete');
        resolve()   // signals success — triggers .then()
    }, 1000)
})

// Consuming with .then()
promiseOne.then(function(){
    console.log("Promise consumed");
})


// Inline promise creation and consumption (no variable needed)
new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log("Async task 2");
        resolve()
    }, 1000)
}).then(function(){
    console.log("Async 2 resolved");
})


// Resolving with a VALUE — passed into .then() callback
const promiseThree = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve({username: "Chai", email: "chai@example.com"})  // resolve with data
    }, 1000)
})

promiseThree.then(function(user){
    console.log(user);  // { username: 'Chai', email: 'chai@example.com' }
})


// ============================================================
// resolve + reject + chaining + .catch + .finally
// ============================================================
const promiseFour = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error) {
            resolve({username: "hitesh", password: "123"})
        } else {
            reject('ERROR: Something went wrong')  // reject with error message
        }
    }, 1000)
})

promiseFour
 .then((user) => {
    console.log(user);
    return user.username       // return value passes to next .then()
}).then((username) => {
    console.log(username);     // receives the returned username
}).catch(function(error){
    console.log(error);        // catches rejection from promiseFour
}).finally(() => console.log("The promise is either resolved or rejected"))
// .finally always runs — good for cleanup (hide loading spinners, close connections)


// ============================================================
// async / await — cleaner alternative to .then() chains
// ============================================================
const promiseFive = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if (!error) {
            resolve({username: "javascript", password: "123"})
        } else {
            reject('ERROR: JS went wrong')
        }
    }, 1000)
});

// async function automatically returns a promise
async function consumePromiseFive(){
    try {
        const response = await promiseFive  // waits for promise to settle
        console.log(response);
    } catch (error) {
        console.log(error);   // catches rejection
    }
}

consumePromiseFive()


// ============================================================
// fetch API — making real HTTP requests (returns a promise)
// ============================================================
// async function getAllUsers(){
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         const data = await response.json()   // .json() also returns a promise
//         console.log(data);
//     } catch (error) {
//         console.log("E: ", error);
//     }
// }
// getAllUsers()

// Using fetch with .then() chaining
fetch('https://api.github.com/users/hiteshchoudhary')
.then((response) => {
    return response.json()   // parse JSON body — returns a promise
})
.then((data) => {
    console.log(data);       // the actual GitHub user data object
})
.catch((error) => console.log(error))

// promise.all — run multiple promises in parallel, wait for all to finish
