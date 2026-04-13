/*
  CONCEPT: Error Handling — try / catch / finally
  ============================================================
  JavaScript errors are runtime exceptions that crash execution
  unless you handle them. The try/catch block lets you intercept
  errors and respond gracefully instead of crashing.

  FLOW:
    try     → code that might throw
    catch   → runs ONLY if an error was thrown; receives the Error object
    finally → ALWAYS runs, whether an error occurred or not

  An Error object has two key properties:
    error.name    → the error type  (e.g. "TypeError")
    error.message → human-readable description

  BUILT-IN ERROR TYPES:
    Error          → base class for all errors
    SyntaxError    → invalid JS syntax (caught at parse time, rarely at runtime)
    ReferenceError → accessing a variable that doesn't exist
    TypeError      → wrong type operation (e.g. calling null as a function)
    RangeError     → value out of allowed range (e.g. new Array(-1))
    URIError       → malformed URI in encodeURI / decodeURI
  ============================================================
*/

// ─── 1. Basic try / catch ────────────────────────────────────
try {
    // This will throw a ReferenceError — 'undeclaredVar' doesn't exist
    console.log(undeclaredVar);
} catch (error) {
    console.log("Caught:", error.name);     // ReferenceError
    console.log("Message:", error.message); // undeclaredVar is not defined
}
// Execution continues normally after the catch block

// ─── 2. try / catch / finally ────────────────────────────────
function riskyOperation() {
    try {
        const result = JSON.parse("{ invalid json }");  // throws SyntaxError
        return result;
    } catch (error) {
        console.log("Parse failed:", error.message);
        return null;
    } finally {
        // Runs regardless of success or failure
        // Great for: closing DB connections, stopping loaders, cleanup
        console.log("Cleanup complete — this always runs");
    }
}
riskyOperation();

// ─── 3. Identifying error types ──────────────────────────────
try {
    null.toString();  // TypeError: Cannot read properties of null
} catch (error) {
    console.log(error instanceof TypeError);  // true
    console.log(error.name);                  // "TypeError"
    console.log(error.message);               // "Cannot read properties of null"
}

try {
    new Array(-1);  // RangeError: Invalid array length
} catch (error) {
    console.log(error.name);    // "RangeError"
    console.log(error.message); // "Invalid array length"
}

// ─── 4. Throwing your own errors ─────────────────────────────
// Use `throw` to signal that something went wrong in your logic
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
        // throw stops execution immediately — jumps to nearest catch
    }
    return a / b;
}

try {
    console.log(divide(10, 2));  // 5
    console.log(divide(10, 0));  // throws — next line never runs
    console.log("This line is never reached");
} catch (error) {
    console.log("Error caught:", error.message);
}

// ─── 5. Re-throwing — only handle what you expect ────────────
/*
  A critical pattern: catch specific errors you know how to handle,
  re-throw anything else so higher-level code (or the runtime) can
  deal with unexpected issues. Never silently swallow unknown errors.
*/
function parseConfig(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log("Invalid JSON config:", error.message);
            return {};  // safe fallback for this known case
        }
        throw error;  // unexpected error — don't silently swallow it
    }
}

console.log(parseConfig('{"port": 3000}'));  // { port: 3000 }
console.log(parseConfig("bad input"));       // → logs warning, returns {}

// ─── 6. Errors in async code ─────────────────────────────────
// try/catch works with async/await just like synchronous code
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("Request failed:", error.message);
        return null;
    }
}

// ─── 7. Common mistake — try/catch does NOT catch async errors ──
/*
  Without async/await, you must use .catch() on the Promise:

  ❌ Wrong — this catch block won't fire for the rejected promise:
    try {
        someAsyncFn();  // forgot await
    } catch(e) { ... }

  ✅ Right:
    try {
        await someAsyncFn();
    } catch(e) { ... }

  or:
    someAsyncFn().catch(e => { ... });
*/
