/*
  CONCEPT: Optional Chaining (?.) and Nullish Coalescing (??)
  ============================================================
  Two ES2020 operators that together eliminate most defensive
  null/undefined guard checks.

  OPTIONAL CHAINING (?.)
    → Returns undefined instead of throwing if the left side is
      null or undefined. Short-circuits the rest of the expression.

    obj?.prop           → safe property access
    obj?.method()       → safe method call
    arr?.[index]        → safe bracket / index access

  NULLISH COALESCING (??)
    value ?? fallback   → use fallback ONLY if value is null/undefined
                          (unlike ||, it keeps 0, "", false as real values)

  NULLISH ASSIGNMENT (??=)
    x ??= value         → assign only if x is null or undefined

  LOGICAL ASSIGNMENT (||=  &&=)
    x ||= value         → assign only if x is falsy  (0, "", false, null, undefined)
    x &&= value         → assign only if x is truthy
  ============================================================
*/

// ─── 1. The problem optional chaining solves ─────────────────
const user = {
    profile: {
        address: {
            city: "Delhi"
        }
    }
};

// Without optional chaining — long guard chain
const city1 = user && user.profile && user.profile.address && user.profile.address.city;
console.log(city1);  // "Delhi"

// With optional chaining — concise and readable
const city2 = user?.profile?.address?.city;
console.log(city2);  // "Delhi"

// Property that doesn't exist — returns undefined, never throws
const zip = user?.profile?.address?.zip;
console.log(zip);  // undefined

// ─── 2. When the object itself is null ───────────────────────
const emptyUser = null;
// emptyUser.name  → TypeError: Cannot read properties of null
const name = emptyUser?.name;  // undefined — no error
console.log(name);  // undefined

// ─── 3. Safe method calls ────────────────────────────────────
const arr = null;
// arr.map(...)  → TypeError
const result = arr?.map(x => x * 2);
console.log(result);  // undefined

// Only calls toUpperCase if str is not null/undefined
const str = "hello";
console.log(str?.toUpperCase());   // "HELLO"
console.log(null?.toUpperCase());  // undefined

// ─── 4. Safe array / bracket access ─────────────────────────
const users = [{ name: "Alice" }, { name: "Bob" }];
console.log(users?.[0]?.name);   // "Alice"
console.log(users?.[99]?.name);  // undefined — index out of bounds, no error

const emptyArr = null;
console.log(emptyArr?.[0]);  // undefined

// ─── 5. Nullish Coalescing (??) vs OR (||) ───────────────────
/*
  KEY DIFFERENCE:
    || replaces: null, undefined, 0, "", false, NaN
    ?? replaces: null, undefined  (ONLY these two)

  This matters when 0, "", or false are VALID values you want to keep.
*/
const count = 0;
console.log(count || 10);   // 10  ← WRONG: 0 is valid but treated as falsy
console.log(count ?? 10);   //  0  ← CORRECT: 0 is a real value, not "missing"

const label = "";
console.log(label || "default");   // "default"  — replaces empty string
console.log(label ?? "default");   // ""         — keeps empty string

const isActive = false;
console.log(isActive || true);     // true   — replaces false
console.log(isActive ?? true);     // false  — false is intentional here

// ─── 6. Practical: parsing an API response ───────────────────
const apiResponse = {
    data: {
        user: {
            name: "Ravi",
            age: null,       // explicitly set to null
            score: 0,        // valid zero score
            bio: undefined,  // not provided by API
        }
    }
};

const userName  = apiResponse?.data?.user?.name  ?? "Anonymous";
const userAge   = apiResponse?.data?.user?.age   ?? "N/A";
const userScore = apiResponse?.data?.user?.score ?? 100;  // keeps 0 — intended!
const userBio   = apiResponse?.data?.user?.bio   ?? "No bio yet";

console.log(userName, userAge, userScore, userBio);
// "Ravi"  "N/A"  0  "No bio yet"

// ─── 7. Nullish Assignment (??=) ─────────────────────────────
let config = {
    theme: "dark",
    fontSize: null,
    // language not set at all
};

config.theme    ??= "light";   // "dark" — already set, NOT overwritten
config.fontSize ??= 16;        // null   → now 16
config.language ??= "en";      // undefined → now "en"

console.log(config);
// { theme: "dark", fontSize: 16, language: "en" }

// ─── 8. Logical Assignment Operators ─────────────────────────
let a = null;
let b = 5;
let c = 10;

a ||= "default";   // a was falsy (null)   → assigned "default"
b ||= "default";   // b is truthy (5)      → NOT assigned, stays 5
c &&= c * 2;       // c is truthy (10)     → assigned 20

console.log(a, b, c);  // "default"  5  20

// ─── 9. Chaining ?. and ?? together ──────────────────────────
// The most common real-world pattern: safe access + fallback value
const settings = null;

const theme    = settings?.display?.theme    ?? "light";
const fontSize = settings?.display?.fontSize ?? 14;
const lang     = settings?.locale?.language  ?? "en";

console.log(theme, fontSize, lang);  // "light"  14  "en"
