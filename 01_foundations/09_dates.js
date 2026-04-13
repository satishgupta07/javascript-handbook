// ============================================================
// CONCEPT: Dates in JavaScript
// ============================================================
// The Date object represents a moment in time.
// Internally stored as milliseconds since Unix Epoch (Jan 1, 1970 UTC).
//
// Creating dates:
//   new Date()                   → current date & time
//   new Date(year, month, day)   → month is 0-indexed! (0=Jan, 11=Dec)
//   new Date("YYYY-MM-DD")       → ISO string format
//   new Date("MM-DD-YYYY")       → US format string
//
// Displaying dates:
//   .toString()         → full date string with timezone
//   .toDateString()     → human-readable date only (no time)
//   .toLocaleString()   → locale-aware date + time string
//
// Timestamps:
//   Date.now()          → milliseconds since epoch (useful for timing/IDs)
//   date.getTime()      → same but on a specific Date instance
//
// Extracting parts:
//   .getMonth()   → 0–11 (add 1 for human-readable month number)
//   .getDay()     → 0–6 (0 = Sunday)
//   .getDate()    → day of month (1–31)
//   .getFullYear()→ 4-digit year
// ============================================================

// Current date and time
let myDate = new Date()
// console.log(myDate.toString());      // full string: "Mon Oct 09 2023 16:22:22 GMT+0530..."
// console.log(myDate.toDateString());  // short: "Mon Oct 09 2023"
// console.log(myDate.toLocaleString());// locale: "10/9/2023, 4:22:22 PM"
// console.log(typeof myDate);          // "object"

// Creating a specific date — IMPORTANT: month is 0-indexed
// let myCreatedDate = new Date(2023, 0, 23)        // Jan 23, 2023
// let myCreatedDate = new Date(2023, 0, 23, 5, 3)  // Jan 23, 2023 at 05:03
// let myCreatedDate = new Date("2023-01-14")        // ISO format: Jan 14, 2023
let myCreatedDate = new Date("01-14-2023")           // US format: Jan 14, 2023
// console.log(myCreatedDate.toLocaleString());

// Timestamp — milliseconds since Jan 1, 1970 (Unix Epoch)
let myTimeStamp = Date.now()

// console.log(myTimeStamp);                        // e.g. 1696843942123
// console.log(myCreatedDate.getTime());            // timestamp for that specific date
// console.log(Math.floor(Date.now()/1000));        // convert ms to seconds

// Getting parts of the current date
let newDate = new Date()
console.log(newDate);
console.log(newDate.getMonth() + 1);  // +1 because months are 0-indexed
console.log(newDate.getDay());        // 0=Sun, 1=Mon, ... 6=Sat

// `${newDate.getDay()} and the time `  ← template literal example

// toLocaleString with options — formats output in a custom locale style
newDate.toLocaleString('default', {
    weekday: "long",   // shows full weekday name e.g. "Monday"
})

console.log(newDate)
