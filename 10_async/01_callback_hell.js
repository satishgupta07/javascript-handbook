/*
  CONCEPT: Callback Hell & Inversion of Control
  ============================================================
  Callbacks are powerful (see 08_events/ — they handle async code),
  but heavily nested callbacks create two serious problems:

  1. CALLBACK HELL (Pyramid of Doom)
     Each async step must nest inside the previous callback.
     The code grows rightward in an unreadable triangular shape.

  2. INVERSION OF CONTROL
     When you pass a callback to a third-party function, you hand
     over CONTROL of when (and whether) your callback runs.
     If that function has a bug, your code may never execute — or
     execute twice, or with wrong arguments. You cannot verify it.

  These two problems are WHY Promises were invented.
  Understanding the pain of callbacks makes Promises make sense.
  ============================================================
*/

// ─── 1. Callbacks are fine for one level deep ─────────────────
// Simple, clean, easy to read
function loadUser(id, callback) {
    setTimeout(() => {
        const user = { id, name: "Alice" };
        callback(user);
    }, 100);
}

loadUser(1, function(user) {
    console.log("Got user:", user.name);
});

// ─── 2. Two levels — manageable but getting messy ─────────────
function loadPosts(userId, callback) {
    setTimeout(() => {
        const posts = [{ id: 101, title: "Post 1" }, { id: 102, title: "Post 2" }];
        callback(posts);
    }, 100);
}

loadUser(1, function(user) {
    loadPosts(user.id, function(posts) {
        console.log("User:", user.name, "| Posts:", posts.length);
    });
});

// ─── 3. CALLBACK HELL — a real e-commerce example ─────────────
/*
  Scenario: user places an order. The steps must happen in sequence:
    1. createOrder(cart)       → returns orderId
    2. proceedToPayment(id)    → returns paymentInfo
    3. showOrderSummary(info)  → shows summary
    4. updateWallet(info)      → updates user's wallet

  Each step depends on the result of the previous one.
  With callbacks, this looks like this:
*/

// Simulated API functions
function createOrder(cart, callback) {
    setTimeout(() => {
        console.log("Order created for:", cart);
        callback({ orderId: "ORD-001", items: cart });
    }, 100);
}

function proceedToPayment(order, callback) {
    setTimeout(() => {
        console.log("Payment processed for order:", order.orderId);
        callback({ paymentId: "PAY-999", amount: 1500, order });
    }, 100);
}

function showOrderSummary(payment, callback) {
    setTimeout(() => {
        console.log(`Summary: Order ${payment.order.orderId} — ₹${payment.amount} paid`);
        callback(payment);
    }, 100);
}

function updateWallet(payment, callback) {
    setTimeout(() => {
        console.log("Wallet updated. Cashback added.");
        callback({ success: true });
    }, 100);
}

// ← THIS IS CALLBACK HELL — the "Pyramid of Doom"
const cart = ["shoes", "pants", "kurta"];

createOrder(cart, function(order) {                           // level 1
    proceedToPayment(order, function(payment) {               // level 2
        showOrderSummary(payment, function(payment) {         // level 3
            updateWallet(payment, function(result) {          // level 4
                console.log("All done:", result);
                // Imagine more steps here — the pyramid grows rightward
            });
        });
    });
});

/*
  Problems with the above code:
    1. Readability: deeply nested, hard to follow the flow
    2. Error handling: you'd need to add error checks at every level
    3. Debugging: stack traces are confusing with unnamed callbacks
    4. Maintenance: adding or removing a step requires restructuring everything
*/

// ─── 4. INVERSION OF CONTROL explained ───────────────────────
/*
  When you write:

    createOrder(cart, function() {
        proceedToPayment();   ← this is YOUR code
    });

  You are trusting createOrder (possibly written by someone else,
  possibly a third-party library) to call your callback:
    - At the right time
    - Exactly once
    - With the correct arguments
    - At all (not never calling it)

  You have LOST CONTROL of proceedToPayment.

  What if createOrder has a bug and:
    - Calls the callback TWICE? → user gets charged twice
    - Never calls it? → order is stuck, payment never happens
    - Calls it with wrong data? → corrupt payment info

  You cannot verify or guarantee any of this from outside.
  This is Inversion of Control — and it's dangerous for critical
  code paths like payments.
*/

// ─── 5. The Promise solution (preview) ───────────────────────
/*
  Promises solve BOTH problems:
    - Callback Hell → replaced by .then() chaining (flat, readable)
    - Inversion of Control → YOU attach the handler via .then(),
      so you're in control of when it runs

  Example of the same flow using Promises (see promises.js):

  createOrder(cart)
      .then(order   => proceedToPayment(order))
      .then(payment => showOrderSummary(payment))
      .then(payment => updateWallet(payment))
      .then(result  => console.log("All done:", result))
      .catch(error  => console.log("Something failed:", error));

  → Flat, readable, easy to add/remove steps, single error handler
*/

// ─── 6. Error handling in callback hell ───────────────────────
// Every nested level needs its own error check — another pain point
function riskyOperation(success, callback) {
    setTimeout(() => {
        if (!success) {
            callback(new Error("Operation failed"), null);
            return;
        }
        callback(null, { data: "result" });
    }, 50);
}

// Node.js "error-first callback" convention: (err, result) => {}
riskyOperation(true, function(err, result) {
    if (err) { console.log("Step 1 failed:", err.message); return; }

    riskyOperation(false, function(err, result) {
        if (err) { console.log("Step 2 failed:", err.message); return; }

        riskyOperation(true, function(err, result) {
            if (err) { console.log("Step 3 failed:", err.message); return; }
            console.log("All steps done:", result);
        });
    });
});
// Each level has its own error handling — vs Promises' single .catch()
