/*
  CONCEPT: The `this` Keyword — All Contexts
  ============================================================
  `this` refers to an OBJECT. Which object depends entirely on
  HOW and WHERE the function containing `this` is called —
  not where the function is defined.

  THE FOUR BINDING RULES (in priority order):
    1. new binding      → `this` = newly created object
    2. Explicit binding → `this` = whatever you pass to call/apply/bind
    3. Implicit binding → `this` = the object before the dot
    4. Default binding  → `this` = global object (or undefined in strict mode)

  ARROW FUNCTIONS are the exception — they have NO `this` of their own.
  They inherit `this` from their surrounding lexical context.

  CONTEXTS:
    Global space        → window (browser) / {} (Node.js)
    Regular function    → undefined (strict) / window (non-strict, substitution)
    Object method       → the object the method is called on
    call/apply/bind     → whatever you explicitly pass
    Arrow function      → enclosing context's `this`
    Class constructor   → the new instance being created
    DOM event handler   → the HTML element that was clicked
  ============================================================
*/

"use strict";  // remove this line to see non-strict mode differences

// ─── 1. `this` in global scope ───────────────────────────────
// In browser: window object. In Node.js: empty module object.
console.log(this);   // {} in Node, window in browser

// ─── 2. `this` in a regular function ─────────────────────────
function showThis() {
    console.log(this);
    // strict mode  → undefined
    // non-strict   → global window object (due to "this substitution")
}
showThis();  // undefined (in strict mode)

// "this substitution": in non-strict mode, if `this` would be
// null/undefined, JS substitutes the global object automatically.

// ─── 3. `this` depends on HOW the function is called ─────────
function identify() {
    console.log(this?.name ?? "no name");
}

// Same function, different callers
const person1 = { name: "Alice", identify };
const person2 = { name: "Bob",   identify };

person1.identify();  // "Alice" — called on person1, this = person1
person2.identify();  // "Bob"   — called on person2, this = person2

// ─── 4. `this` in an object method (implicit binding) ────────
const user = {
    name: "Ravi",
    age: 25,
    greet: function() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age}`);
        // this → user (the object before the dot)
    }
};
user.greet();  // "Hi, I'm Ravi and I'm 25"

// Gotcha: detaching a method loses the binding
const detached = user.greet;
// detached();  // this is undefined / window — no object before the dot anymore!

// ─── 5. call(), apply(), bind() — explicit binding ───────────
const student = {
    name: "Akash",
    printName: function() {
        console.log(this.name);
    }
};

const student2 = { name: "Priya" };

// call() — invoke immediately, pass this explicitly
student.printName.call(student2);   // "Priya"

// apply() — same as call, but arguments passed as ARRAY
function introduce(city, country) {
    console.log(`${this.name} from ${city}, ${country}`);
}
introduce.call(student2,  "Mumbai", "India");    // "Priya from Mumbai, India"
introduce.apply(student2, ["Mumbai", "India"]);  // same result, array form

// bind() — does NOT call immediately; returns a new function with `this` locked
const boundIntroduce = introduce.bind(student2, "Delhi");
boundIntroduce("India");  // "Priya from Delhi, India"

// bind is useful for event handlers and callbacks:
const timer = {
    label: "Countdown",
    start: function() {
        // Without bind, `this` inside setTimeout callback would be undefined/window
        setTimeout(function() {
            console.log(this?.label ?? "lost this");  // would be undefined without bind
        }.bind(this), 100);
    }
};
timer.start();  // "Countdown" — bind preserves `this`

// ─── 6. Arrow functions — no own `this` ──────────────────────
/*
  Arrow functions DO NOT have their own `this`.
  They capture `this` from the enclosing lexical context at the
  time they are DEFINED (not called). Call/apply/bind have no effect.
*/
const obj = {
    name: "MyObject",
    // Regular method — `this` is determined by caller
    regularMethod: function() {
        console.log(this.name);   // "MyObject" — this = obj
    },
    // Arrow method — `this` is from enclosing scope (global/module)
    arrowMethod: () => {
        console.log(this?.name);  // undefined — this is NOT obj here
    }
};
obj.regularMethod();  // "MyObject"
obj.arrowMethod();    // undefined

// Where arrow functions HELP: callbacks inside methods
const counter = {
    count: 0,
    name: "counter",
    increment: function() {
        // ❌ Using regular function in callback — `this` is lost
        // setTimeout(function() { this.count++; }, 100);  // this = undefined

        // ✅ Arrow function captures `this` from increment's context = counter object
        setTimeout(() => {
            this.count++;
            console.log(`${this.name}: ${this.count}`);
        }, 100);
    }
};
counter.increment();  // "counter: 1"

// ─── 7. `this` in class constructors (new binding) ───────────
class Animal {
    constructor(name, sound) {
        this.name  = name;   // `this` = the new object being created
        this.sound = sound;
    }
    speak() {
        console.log(`${this.name} says ${this.sound}`);
        // `this` = the instance that .speak() is called on
    }
}

const dog = new Animal("Rex", "woof");
const cat = new Animal("Whiskers", "meow");
dog.speak();  // "Rex says woof"
cat.speak();  // "Whiskers says meow"

// ─── 8. `this` in DOM event handlers ─────────────────────────
/*
  In a DOM event handler (regular function), `this` refers to
  the HTML element that received the event.

  button.addEventListener('click', function() {
      console.log(this);           // <button> element
      console.log(this.innerText); // button's text
  });

  With arrow function, `this` is NOT the element:
  button.addEventListener('click', () => {
      console.log(this);  // undefined (strict) or window — NOT the button
  });
*/

// ─── 9. `this` binding priority summary ──────────────────────
/*
  Priority  Binding type     How triggered
  ────────────────────────────────────────────────────────────
    1        new             new Foo()  — this = new object
    2        Explicit        fn.call(obj) / fn.apply(obj) / fn.bind(obj)
    3        Implicit        obj.method() — this = obj
    4        Default         fn()  — this = undefined (strict) / global (non-strict)
    —        Arrow           Inherited from enclosing lexical scope; not bound
*/
