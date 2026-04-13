// ============================================================
// PROJECT: Unlimited Color Changer
// ============================================================
// Concepts used:
//   - setInterval(fn, ms)  → repeatedly calls fn every ms milliseconds
//   - clearInterval(id)    → stops a running interval using its ID
//   - Math.random()        → generates a random float 0–1
//   - Hex color generation → build a 6-character hex string (#RRGGBB)
//   - Closure             → changeBgColor is defined inside startChangingColor
//                           and closes over the hex/color logic
//   - Guard clause (if !intervalId) → prevents stacking multiple intervals
//                           if Start is clicked repeatedly
//
// HEX COLOR FORMULA:
//   '#' + 6 random chars from '0123456789ABCDEF'
//   Each char = Math.floor(Math.random() * 16) → picks index 0–15
// ============================================================

// Generates a random valid CSS hex color e.g. "#3F7AC2"
const randomColor = function () {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];  // pick a random hex digit
    }
    return color;
};

let intervalId;  // stores the interval reference so it can be stopped later

// Starts the color-changing interval (guard prevents double-starting)
const startChangingColor = function () {
    if (!intervalId) {  // only start if not already running
      intervalId = setInterval(changeBgColor, 1000);
    }

    // changeBgColor is defined here — closes over randomColor via the outer scope
    function changeBgColor() {
      document.body.style.backgroundColor = randomColor();
    }
};

// Stops the interval and clears the reference
const stopChangingColor = function () {
    clearInterval(intervalId);  // cancel the running interval
    intervalId = null;          // reset so Start can work again
};

document.querySelector('#start').addEventListener('click', startChangingColor);
document.querySelector('#stop').addEventListener('click', stopChangingColor);
