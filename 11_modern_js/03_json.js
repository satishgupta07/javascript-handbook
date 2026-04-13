/*
  CONCEPT: JSON — JavaScript Object Notation
  ============================================================
  JSON is the universal data exchange format for APIs, config
  files, localStorage, and data storage. It's a plain STRING
  that looks like a JavaScript object but has strict rules.

  JSON RULES (different from JS object literals):
    - Keys MUST be double-quoted strings  ("name", not name)
    - Values allowed: string, number, boolean, null, array, object
    - Values NOT allowed: functions, undefined, Symbol, Date, NaN, Infinity
    - No trailing commas
    - No comments

  TWO KEY METHODS:
    JSON.stringify(value, replacer, space)
      → Converts JS value → JSON string (serialization)
    JSON.parse(text, reviver)
      → Converts JSON string → JS value (deserialization)
  ============================================================
*/

// ─── 1. JSON.stringify — JS to string ────────────────────────
const user = {
    name: "Alice",
    age: 28,
    isActive: true,
    scores: [95, 87, 92],
    address: { city: "Mumbai", pin: "400001" }
};

const compact = JSON.stringify(user);
console.log(compact);
// {"name":"Alice","age":28,"isActive":true,"scores":[95,87,92],"address":{"city":"Mumbai","pin":"400001"}}
// → one long string, no whitespace

// Pretty print: 3rd argument = indentation level (2 spaces here)
const pretty = JSON.stringify(user, null, 2);
console.log(pretty);
/*
{
  "name": "Alice",
  "age": 28,
  "isActive": true,
  "scores": [95, 87, 92],
  "address": {
    "city": "Mumbai",
    "pin": "400001"
  }
}
*/

// ─── 2. JSON.parse — string to JS ────────────────────────────
const parsed = JSON.parse(compact);
console.log(parsed.name);                    // "Alice"
console.log(parsed.address.city);            // "Mumbai"
console.log(Array.isArray(parsed.scores));   // true
console.log(typeof parsed);                  // "object"

// ─── 3. What gets LOST in stringify ──────────────────────────
const messy = {
    name: "test",
    fn: function() {},      // functions   → completely dropped
    sym: Symbol("id"),      // Symbols     → completely dropped
    undef: undefined,        // undefined   → completely dropped
    nan: NaN,               // NaN         → converted to null
    inf: Infinity,           // Infinity    → converted to null
    date: new Date(),        // Date object → converted to ISO string
};

console.log(JSON.stringify(messy));
// {"name":"test","nan":null,"inf":null,"date":"2024-06-15T10:30:00.000Z"}
// Notice: fn, sym, undef are completely gone without error

// ─── 4. replacer — control what gets serialized ──────────────
const data = { name: "Bob", password: "secret123", age: 30, role: "admin" };

// replacer as ARRAY — whitelist only these keys
const safe = JSON.stringify(data, ["name", "age"], 2);
console.log(safe);
// { "name": "Bob", "age": 30 }  — password and role excluded

// replacer as FUNCTION — transform or exclude each value
const transformed = JSON.stringify(data, (key, value) => {
    if (key === "password") return undefined;  // returning undefined removes the key
    if (typeof value === "string") return value.toUpperCase();
    return value;
}, 2);
console.log(transformed);
// { "NAME": "BOB", "AGE": 30, "ROLE": "ADMIN" }

// ─── 5. reviver — transform while parsing ─────────────────────
/*
  A common problem: JSON.parse turns Date strings back into strings,
  not Date objects. The reviver lets you fix that.
*/
const event = {
    title: "Workshop",
    date: new Date("2024-06-15")
};

const serialized   = JSON.stringify(event);     // date → ISO string
const deserialized = JSON.parse(serialized, (key, value) => {
    if (key === "date") return new Date(value); // string → Date object
    return value;
});

console.log(deserialized.date instanceof Date);  // true
console.log(deserialized.date.getFullYear());    // 2024

// ─── 6. Deep clone with JSON round-trip ──────────────────────
/*
  A common quick trick: JSON round-trip creates a deep copy.
  LIMITATIONS: functions, Dates, undefined, NaN all lost/converted.
  For full fidelity use structuredClone() (modern) or lodash cloneDeep.
*/
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const deepCopy  = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 99;
deepCopy.b.d.push(5);

console.log(original.b.c);        // 2     — original unchanged
console.log(original.b.d.length); // 2     — original unchanged

// ─── 7. Always wrap JSON.parse in try/catch ───────────────────
/*
  JSON.parse throws a SyntaxError on invalid input.
  Any untrusted string (user input, API response) should be parsed safely.
*/
function safeParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.log("Invalid JSON:", error.message);
        return fallback;
    }
}

console.log(safeParse('{"valid": true}'));    // { valid: true }
console.log(safeParse("{bad json}"));         // logs error → null
console.log(safeParse("undefined"));          // logs error → null
console.log(safeParse("null"));               // null (valid JSON!)

// ─── 8. JSON with localStorage (browser reference) ────────────
/*
  localStorage only stores strings, so JSON is the bridge:

  const cart = [{ id: 1, qty: 2 }, { id: 5, qty: 1 }];

  // Save
  localStorage.setItem("cart", JSON.stringify(cart));

  // Load (with safe fallback to empty array)
  const saved = JSON.parse(localStorage.getItem("cart") ?? "[]");
  console.log(saved);  // [{ id: 1, qty: 2 }, { id: 5, qty: 1 }]
*/

// ─── 9. Quick reference ──────────────────────────────────────
/*
  Task                               Code
  ──────────────────────────────────────────────────────────────
  JS → JSON string (compact)         JSON.stringify(obj)
  JS → JSON string (pretty)          JSON.stringify(obj, null, 2)
  JS → JSON (exclude keys)           JSON.stringify(obj, ["key1", "key2"])
  JSON string → JS                   JSON.parse(str)
  JSON string → JS (safe)            try { JSON.parse(str) } catch { ... }
  Deep clone (simple objects only)   JSON.parse(JSON.stringify(obj))
*/
