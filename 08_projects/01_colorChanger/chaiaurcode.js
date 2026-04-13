// ============================================================
// PROJECT: Color Changer
// ============================================================
// Concepts used:
//   - querySelectorAll → returns a NodeList of all matching elements
//   - forEach on NodeList → iterate over all buttons
//   - addEventListener('click', fn) → attach click handler to each button
//   - e.target → the specific element that was clicked
//   - e.target.id → read the id attribute of the clicked button
//   - body.style.backgroundColor → change a CSS property via JS
//
// KEY IDEA — Event Listener per element:
//   Each button gets its own click listener.
//   e.target.id matches the button's id which also happens to be
//   a valid CSS color name, so we pass it directly as the background color.
// ============================================================

const buttons = document.querySelectorAll('.button');  // all buttons with class="button"
const body = document.querySelector('body');

// Attach a click listener to EVERY button
buttons.forEach(function (button) {
  console.log(button);
  button.addEventListener('click', function (e) {
    console.log(e);           // full event object
    console.log(e.target);    // the specific button that was clicked

    // e.target.id is "grey", "white", "blue", or "yellow"
    // which also happen to be valid CSS color names
    if (e.target.id === 'grey') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'white') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'blue') {
      body.style.backgroundColor = e.target.id;
    }
    if (e.target.id === 'yellow') {
      body.style.backgroundColor = e.target.id;
    }
  });
});
