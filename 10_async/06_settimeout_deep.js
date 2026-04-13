/*
  CONCEPT: setTimeout — Timing Guarantees & The Concurrency Model
  ============================================================
  setTimeout does NOT guarantee exact execution time.
  It guarantees a MINIMUM wait — the actual execution may be later,
  depending on how busy the call stack is.

  WHY:
    setTimeout's callback goes into the CALLBACK QUEUE after the
    timer expires. The Event Loop only moves it to the Call Stack
    when the stack is completely empty. If the main thread is busy
    running code, the callback waits — however long that takes.

  RULE #1 OF JAVASCRIPT:
    Never block the main thread.
    JS is single-threaded — one slow synchronous operation blocks
    ALL async callbacks from running until it finishes.

  setTimeout(fn, 0):
    Even with 0ms delay, the callback goes through the queue.
    It always runs AFTER the current call stack empties.
    Useful trick: defer a low-priority operation to let higher-priority
    code finish first.
  ============================================================
*/

// ─── 1. Basic setTimeout — non-blocking ───────────────────────
console.log("Start");

setTimeout(function cb() {
    console.log("Callback fires!");  // prints last
}, 2000);

console.log("End");
// Output order:
// "Start"
// "End"
// "Callback fires!"  ← after ~2000ms, but only after stack is empty

// ─── 2. setTimeout(fn, 0) — deferred but NOT immediate ────────
console.log("A");

setTimeout(function() {
    console.log("B — setTimeout 0");  // still runs after C
}, 0);

console.log("C");
// Output: A → C → B
// Even with 0ms delay, B must wait for the current stack to clear

// ─── 3. Trust issue — blocking delays the callback ────────────
/*
  If the call stack is busy (e.g. a long loop runs for 10s),
  a setTimeout(fn, 5000) callback will NOT run at 5s.
  It runs at 10s — only after the stack empties.
*/

console.log("Timer start");

setTimeout(function() {
    console.log("Timer callback — fires when stack is free");
}, 1000);

// Simulating a blocking operation (DO NOT do this in real code)
const start = Date.now();
while (Date.now() - start < 2000) {
    // Blocking the main thread for 2 seconds
    // During this time, the setTimeout callback is stuck in the queue
}

console.log("Blocking loop finished");
// Timer was set for 1s, but ran at ~2s (after the loop freed the stack)

// ─── 4. The concurrency model ─────────────────────────────────
/*
  CALL STACK          WEB APIs              CALLBACK QUEUE
  ─────────           ─────────             ──────────────
  main code           timer for 5s          (empty)
  ...runs...          ↓ expires at 5s
  ...runs...          cb → Callback Queue
  ...runs...          Event Loop checks: stack empty? No → wait
  ← finishes →        Event Loop: stack empty? Yes → move cb to stack
                      cb runs here

  This is why JS can handle async without blocking:
    - Slow operations (timers, fetch, I/O) are delegated to Web APIs
    - The call stack stays free for other code
    - Callbacks come back when the stack is ready
*/

// ─── 5. setTimeout guarantees MINIMUM, not exact ─────────────
function measureDelay(requested) {
    const before = Date.now();
    setTimeout(function() {
        const actual = Date.now() - before;
        console.log(`Requested: ${requested}ms | Actual: ~${actual}ms`);
    }, requested);
}

measureDelay(100);    // likely ~100ms if stack is free
measureDelay(0);      // >0ms — always queued, never truly immediate

// ─── 6. Practical use of setTimeout(fn, 0) ───────────────────
// Defer a non-critical operation so the UI remains responsive
function expensiveRender() {
    console.log("Rendering main content...");
}

function loadAds() {
    console.log("Loading ads (deferred)...");
}

expensiveRender();                      // runs immediately
setTimeout(loadAds, 0);               // deferred — runs after main content renders
console.log("Page setup complete");
// Output: "Rendering main content..." → "Page setup complete" → "Loading ads..."

// ─── 7. clearTimeout — cancel a pending callback ──────────────
const timerId = setTimeout(function() {
    console.log("This will NOT print");
}, 3000);

clearTimeout(timerId);  // cancels the callback before it fires
console.log("Timer cancelled");

// ─── 8. setInterval vs setTimeout ────────────────────────────
/*
  setTimeout(fn, delay)  → fires ONCE after delay
  setInterval(fn, delay) → fires REPEATEDLY every delay ms

  setInterval also suffers the same concurrency issue — if the stack
  is blocked, intervals stack up in the queue and may "burst" when
  the stack frees. Use clearInterval() to stop it.

  See: 08_events/three.html for the setInterval + clearInterval pattern
*/

// ─── 9. The main thread rule — summary ───────────────────────
/*
  ✅ DO:
    - Use setTimeout/setInterval for delayed/repeated tasks
    - Use Promises and async/await for I/O, fetch, DB calls
    - Keep synchronous code short and fast

  ❌ DON'T:
    - Run heavy computations (image processing, large loops) synchronously
    - Assume setTimeout(fn, 5000) fires exactly at 5000ms
    - Assume setTimeout(fn, 0) fires before the next line of code

  The golden rule: keep the call stack free. An occupied stack
  delays every timer, every event, and every Promise resolution.
*/
