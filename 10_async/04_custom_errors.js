/*
  CONCEPT: Custom Error Classes
  ============================================================
  Extending the built-in Error class lets you create domain-specific
  error types that carry extra context and can be identified with
  instanceof checks — enabling targeted error handling.

  WHY CUSTOM ERRORS:
    - Differentiate error categories (ValidationError vs NetworkError)
    - Carry structured extra data (field name, HTTP status code, etc.)
    - Enable catch blocks that handle only the errors they understand
    - Make logs and stack traces far more meaningful

  PATTERN:
    class MyError extends Error {
        constructor(message, extraData) {
            super(message);         // sets this.message
            this.name = "MyError";  // overrides default "Error"
            this.extraData = ...;   // your custom properties
        }
    }
  ============================================================
*/

// ─── 1. Defining custom error classes ────────────────────────
class ValidationError extends Error {
    constructor(message, field) {
        super(message);                    // sets this.message
        this.name = "ValidationError";     // override default "Error"
        this.field = field;                // which field failed validation
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;      // HTTP status (404, 500, etc.)
    }
}

class DatabaseError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = "DatabaseError";
        this.cause = cause;                // the original error that triggered this
    }
}

// ─── 2. Throwing and catching custom errors ───────────────────
function validateAge(age) {
    if (typeof age !== "number") {
        throw new ValidationError("Age must be a number", "age");
    }
    if (age < 0 || age > 150) {
        throw new ValidationError("Age must be between 0 and 150", "age");
    }
    return true;
}

try {
    validateAge("twenty");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Validation failed on '${error.field}': ${error.message}`);
        // Validation failed on 'age': Age must be a number
    } else {
        throw error;  // unexpected — re-throw
    }
}

// ─── 3. Multiple custom error types in one try block ─────────
function fetchUser(id) {
    if (typeof id !== "number")  throw new ValidationError("ID must be a number", "id");
    if (id <= 0)                 throw new ValidationError("ID must be positive", "id");
    if (id > 1000)               throw new NetworkError("User not found", 404);
    return { id, name: "Alice" };  // simulated success
}

try {
    const user = fetchUser(9999);
    console.log(user);
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(`Bad input [${error.field}]: ${error.message}`);
    } else if (error instanceof NetworkError) {
        console.log(`HTTP ${error.statusCode}: ${error.message}`);
        // HTTP 404: User not found
    } else {
        console.log("Unknown error:", error);
    }
}

// ─── 4. Error wrapping — chaining low-level to high-level ────
/*
  A common pattern in multi-layer apps:
  Wrap a low-level error in a domain-specific one so you preserve
  both the context (what failed) and the original cause (why).
*/
function queryDatabase(sql) {
    try {
        // Simulate a low-level DB driver throwing a generic error
        throw new SyntaxError("near 'SELCT': syntax error");
    } catch (lowLevelError) {
        // Wrap it in a domain-meaningful error, preserving the cause
        throw new DatabaseError("Query execution failed", lowLevelError);
    }
}

try {
    queryDatabase("SELCT * FROM users");
} catch (error) {
    console.log(error.name);           // "DatabaseError"
    console.log(error.message);        // "Query execution failed"
    console.log(error.cause.name);     // "SyntaxError"
    console.log(error.cause.message);  // "near 'SELCT': syntax error"
}

// ─── 5. instanceof works through inheritance ─────────────────
const ve = new ValidationError("bad field", "email");

console.log(ve instanceof ValidationError);  // true
console.log(ve instanceof Error);            // true  ← extends Error
console.log(ve instanceof NetworkError);     // false

// ─── 6. Practical: form validation with multiple fields ───────
class FormValidationError extends Error {
    constructor(errors) {
        // errors is an array of { field, message } objects
        super("Form validation failed");
        this.name = "FormValidationError";
        this.errors = errors;
    }
}

function validateSignupForm({ username, email, age }) {
    const errors = [];

    if (!username || username.length < 3)
        errors.push({ field: "username", message: "Must be at least 3 characters" });

    if (!email || !email.includes("@"))
        errors.push({ field: "email", message: "Must be a valid email" });

    if (!Number.isInteger(age) || age < 18)
        errors.push({ field: "age", message: "Must be 18 or older" });

    if (errors.length > 0) {
        throw new FormValidationError(errors);
    }

    return { username, email, age };
}

try {
    validateSignupForm({ username: "ab", email: "notanemail", age: 15 });
} catch (error) {
    if (error instanceof FormValidationError) {
        console.log("Form errors:");
        error.errors.forEach(e => console.log(`  [${e.field}] ${e.message}`));
        // [username] Must be at least 3 characters
        // [email] Must be a valid email
        // [age] Must be 18 or older
    }
}
