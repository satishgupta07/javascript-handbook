// ============================================================
// PROJECT: BMI Calculator
// ============================================================
// Concepts used:
//   - form.addEventListener('submit', fn) → intercept form submission
//   - e.preventDefault() → stop the page from reloading on submit
//   - parseInt(input.value) → read and convert input string to integer
//   - isNaN(val) → check if value is Not a Number (invalid input)
//   - BMI formula: weight(kg) / (height(cm)/100)^2
//   - .toFixed(2) → round result to 2 decimal places
//   - results.innerHTML → display the result in the DOM
//
// VALIDATION PATTERN:
//   Always validate user input before doing any calculation.
//   Check for: empty string, negative number, or NaN (non-numeric input).
// ============================================================

const form = document.querySelector('form');

// Reading value OUTSIDE the event listener gives empty string at page load:
// const height = parseInt(document.querySelector('#height').value)  ← always NaN

// Read values INSIDE the submit handler — only then has the user filled them in
form.addEventListener('submit', function (e) {
  e.preventDefault();  // stop form from doing a full page reload/GET request

  const height = parseInt(document.querySelector('#height').value);  // cm
  const weight = parseInt(document.querySelector('#weight').value);  // kg
  const results = document.querySelector('#results');

  // Input validation — check for invalid height
  if (height === '' || height < 0 || isNaN(height)) {
    results.innerHTML = `Please give a valid height ${height}`;

  // Input validation — check for invalid weight
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    results.innerHTML = `Please give a valid weight ${weight}`;

  } else {
    // BMI formula: weight (kg) / height (m)²
    // height is in cm → divide by 100 to get metres → square it
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    results.innerHTML = `<span>${bmi}</span>`;
  }
});
