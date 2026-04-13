// ============================================================
// PROJECT: Keyboard Key Display
// ============================================================
// Concepts used:
//   - window.addEventListener('keydown', fn) → listen for any key press
//   - event.key     → human-readable key name ("a", "Enter", "ArrowUp", " ")
//   - event.keyCode → numeric code for the key (deprecated but still works)
//   - event.code    → physical key identifier ("KeyA", "Space", "Enter")
//   - Template literals → build HTML table rows dynamically
//   - element.innerHTML → inject the built HTML into the page
//
// key vs keyCode vs code:
//   e.key      "a" / "A" (depends on Shift)   "Enter"    " " (Space)
//   e.keyCode  65                              13          32
//   e.code     "KeyA"                          "Enter"    "Space"
//
//   key      → what the user typed (affected by Shift, CapsLock)
//   keyCode  → deprecated numeric code (avoid in new code)
//   code     → physical key location (independent of modifier keys)
// ============================================================

const insert = document.getElementById('insert');

// Fires on every key press — updates the display table in real time
window.addEventListener('keydown', (e) => {
  insert.innerHTML = `
    <div class='color'>
    <table>
    <tr>
      <th>Key</th>
      <th>Keycode</th>
      <th>Code</th>
    </tr>
    <tr>
      <td>${e.key === ' ' ? 'Space' : e.key}</td>  <!-- show "Space" instead of blank -->
      <td>${e.keyCode}</td>
      <td>${e.code}</td>
    </tr>

  </table>
    </div>
  `;
});
