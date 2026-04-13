// ============================================================
// CONCEPT: Switch Statement
// ============================================================
// switch is an alternative to long if/else if chains.
// Best used when comparing ONE value against MANY fixed options.
//
// SYNTAX:
//   switch (expression) {
//     case value1:
//       // code
//       break;       ← REQUIRED to stop fall-through to next case
//     case value2:
//       // code
//       break;
//     default:       ← runs if no case matches (like the final else)
//       break;
//   }
//
// IMPORTANT:
//   - switch uses STRICT equality (===) for matching
//   - Without `break`, execution FALLS THROUGH to the next case
//   - Fall-through can be used intentionally to share code across cases
// ============================================================

// Template (reference):
// switch (key) {
//     case value:
//         break;
//     default:
//         break;
// }

const month = "march"

switch (month) {
    case "jan":
        console.log("January");
        break;      // ← stops here, skips remaining cases
    case "feb":
        console.log("feb");
        break;
    case "march":
        console.log("march");   // ✅ this case matches
        break;
    case "april":
        console.log("april");
        break;

    default:
        // runs when none of the cases match
        console.log("default case match");
        break;
}
