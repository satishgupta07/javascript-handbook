// ============================================================
// PROJECT: Digital Clock
// ============================================================
// Concepts used:
//   - setInterval(fn, ms) → runs fn every ms milliseconds repeatedly
//   - new Date() → creates a Date object for the current moment
//   - date.toLocaleTimeString() → formats time as "HH:MM:SS AM/PM"
//   - clock.innerHTML → updates the DOM element every second
//
// HOW IT WORKS:
//   setInterval fires the callback every 1000ms (1 second).
//   Each time it runs, a fresh Date object captures the current time
//   and its formatted string is written into the #clock element.
//   The page shows a live-updating clock.
// ============================================================

const clock = document.getElementById('clock');
// const clock = document.querySelector('#clock')   // same result

// Runs every 1000ms — updates the clock display every second
setInterval(() => {
    let date = new Date();                      // current time snapshot
    // console.log(date.toLocaleTimeString());  // e.g. "3:45:12 PM"
    clock.innerHTML = date.toLocaleTimeString(); // update DOM
}, 1000);
