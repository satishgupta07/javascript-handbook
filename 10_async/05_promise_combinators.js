/*
  CONCEPT: Promise Combinators
  ============================================================
  When you have multiple independent async operations, running them
  one after another (sequentially) wastes time. Promise combinators
  let you run them IN PARALLEL and coordinate the results.

  THE FOUR COMBINATORS:

  Promise.all(promises)
    → Resolves when ALL resolve. Rejects immediately if ANY rejects.
    → Result: array of resolved values (same order as input)
    → Use when: you need ALL to succeed before continuing

  Promise.allSettled(promises)
    → Always resolves once ALL promises finish (regardless of outcome)
    → Result: array of { status: "fulfilled"|"rejected", value|reason }
    → Use when: you want every result, even if some failed

  Promise.race(promises)
    → Resolves/rejects with the FIRST settled promise
    → Use when: implementing timeouts, or racing multiple sources

  Promise.any(promises)
    → Resolves with the FIRST fulfilled promise (ignores rejections)
    → Rejects only if ALL reject — result is AggregateError
    → Use when: you need at least one to succeed (fallback strategy)

  SEQUENTIAL vs PARALLEL:
    // Sequential (slow — waits for each before starting next):
    const a = await fetch(url1);
    const b = await fetch(url2);

    // Parallel (fast — all start at the same time):
    const [a, b] = await Promise.all([fetch(url1), fetch(url2)]);
  ============================================================
*/

// Helper — simulates an async API call that resolves after `ms` milliseconds
const fakeRequest = (name, ms, shouldFail = false) =>
    new Promise((resolve, reject) =>
        setTimeout(() => {
            if (shouldFail) reject(new Error(`${name} failed`));
            else resolve(`${name} data`);
        }, ms)
    );

// ─── 1. Promise.all — all or nothing ─────────────────────────
// All three run IN PARALLEL — total time = slowest (200ms), not sum (450ms)
Promise.all([
    fakeRequest("users",    100),
    fakeRequest("posts",    200),
    fakeRequest("comments", 150),
]).then(([users, posts, comments]) => {
    // Result array destructures in input order — not completion order
    console.log("All resolved:", users, posts, comments);
    // "users data"  "posts data"  "comments data"
}).catch(error => {
    console.log("At least one failed:", error.message);
});

// ─── 2. Promise.all — partial failure ────────────────────────
Promise.all([
    fakeRequest("A", 100),
    fakeRequest("B", 50, true),   // fails at 50ms
    fakeRequest("C", 150),
]).catch(error => {
    console.log("Promise.all rejected:", error.message);  // "B failed"
    // A and C may still be running — their results are simply discarded
    // Promise.all has "fail fast" behaviour
});

// ─── 3. Promise.allSettled — never rejects ───────────────────
Promise.allSettled([
    fakeRequest("X", 100),
    fakeRequest("Y", 50, true),   // fails
    fakeRequest("Z", 150),
]).then(results => {
    results.forEach(result => {
        if (result.status === "fulfilled") {
            console.log("OK:", result.value);
        } else {
            console.log("FAILED:", result.reason.message);
        }
    });
    // OK: X data
    // FAILED: Y failed
    // OK: Z data
});
// Great for: sending notifications to multiple users, optional side effects

// ─── 4. Promise.race — first settled wins ────────────────────
Promise.race([
    fakeRequest("slow",   500),
    fakeRequest("fast",   100),
    fakeRequest("medium", 300),
]).then(winner => {
    console.log("Race winner:", winner);  // "fast data"
});

// Classic use: timeout pattern
const withTimeout = (promise, ms) =>
    Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
        )
    ]);

withTimeout(fakeRequest("slow-server", 2000), 1000)
    .then(data => console.log("Got:", data))
    .catch(err => console.log(err.message));  // "Timed out after 1000ms"

// ─── 5. Promise.any — first SUCCESS wins ─────────────────────
// Unlike race, rejections are ignored until all reject
Promise.any([
    fakeRequest("primary",  300, true),   // fails
    fakeRequest("backup",   200, true),   // fails
    fakeRequest("fallback", 100),         // succeeds ← this wins
]).then(result => {
    console.log("First success:", result);  // "fallback data"
}).catch(err => {
    // Only reaches here if ALL promises rejected
    console.log("All failed:", err);        // AggregateError
    console.log(err.errors);               // array of individual errors
});

// ─── 6. async/await with combinators ─────────────────────────
async function loadDashboard() {
    try {
        // Fire all requests at the same time — don't await one by one
        const [user, posts, notifications] = await Promise.all([
            fakeRequest("user",          80),
            fakeRequest("posts",         120),
            fakeRequest("notifications", 60),
        ]);
        console.log("Dashboard loaded:", { user, posts, notifications });
    } catch (error) {
        console.log("Dashboard failed to load:", error.message);
    }
}

loadDashboard();

// ─── 7. Combinator cheat sheet ───────────────────────────────
/*
  Scenario                                    → Use
  ─────────────────────────────────────────────────────────
  Need ALL to succeed                         → Promise.all
  Want ALL results, even if some fail         → Promise.allSettled
  Need fastest response / implement timeout   → Promise.race
  Need at least ONE to succeed (with fallback)→ Promise.any
*/
