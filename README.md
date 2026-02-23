# Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

- getElementById(): This method accesses the element that I want to access through JavaScript by its ID. Since IDs must be unique in HTML, it either finds a match or returns null.
- getElementsByClassName(): Selects all elements with a specific class name. Returns an HTMLCollection (a list-like object) of all elements with that class. It is Live because it automatically updates when the underlying document changes.
- querySelector(): Returns the first element that matches the CSS selector.
- querySelectorAll(): Selects all matching elements using CSS selectors. Returns a NodeList of all matches. Unlike the "live" collections mentioned above, querySelectorAll returns a static collection. if the DOM changes later, this list won't update.

### 2. How do you create and insert a new element into the DOM?

- Step 1: document.createElement("tagName") use this method create a new element. Now a new element is created in memory — But it is NOT inside the page yet.
- Step 2: Add Content or Attributes — You can add text, class, id, etc.
- Step 3: Step 3: Insert Into the DOM — Now insert it into the page. You need a parent element, then insert the created element using appendChild() or append().

### 3. What is Event Bubbling? And how does it work?

Event Bubbling is when an event starts from the target element and then "bubbles up" to its parent elements. When you click an element, the browser goes through 3 phases:
- Capturing Phase — Event goes from: window ➜ document ➜ html ➜ body ➜ parent ➜ child
- Target Phase — Event reaches the clicked element.
- Bubbling Phase — Event goes back up: child ➜ parent ➜ body ➜ html ➜ document ➜ window. By default, JavaScript listens in the bubbling phase.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is a technique where you attach one event listener to a parent element instead of attaching listeners to many child elements. It works because of event bubbling. When you click a button:
- Button gets the click
- Event bubbles up to parent
- Parent catches the event
- We check event.target

### 5. What is the difference between preventDefault() and stopPropagation() methods?

- preventDefault(): Stops the default browser behavior.
- stopPropagation(): Stops the event from bubbling up to parent elements.
