# Reflection - Portfolio Project

## Part A: Review and Improve Portfolio

### 1. Improvements I Made

**HTML**

- Changed `<div class="container">` to `<main>` for better structure and semantics.
- Added a `<footer>` to include a footer.
- Updated the button with `type="button"` and an `aria-label` for accessibility.
- Added a `<meta name="description">` for SEO.

**CSS**

- Fixed a small typo: removed an extra semicolon in the button transition.
- Added `:active`state for buttons for better user experience.
- Added `:disabled`state for buttons in case they are disabled.
- Used `rem`units instead of pixels for padding and spacing for better scaling.
- Checked colors for better readability and accessibility.

**JavaScript**

- Updated `main.js`to safely check the button exists before adding an event listener.


### 2. ASCII Diagram of Project Structure

```
Portfolio Project Structure
──────────────────────────

index.html
│
├── <head>
│    ├─ meta tags (charset, viewport, description)
│    ├─ title
│    └─ link to style.css
│
├── <body>
│    ├─ <section class="about">
│    │    ├─ <h1 class="about__title">
│    │    └─ <p class="about__text">
│    │
│    ├─ <main class="container">
│    │    ├─ <h2 class="container__title">
│    │    └─ <ul class="container__list">
│    │         ├─ <li> Full-stack web development
│    │         ├─ <li> Python with Flask
│    │         └─ <li> Problem-solving and database design
│    │
│    ├─ <div class="button-center">
│    │    └─ <button id="colorChangeButton">
│    │
│    └─ <footer class="footer">
│         └─ <p> © 2026 Benjina Paudyal
│
└── <script src="main.js">

style.css
│
├─ Global styles (box-sizing, font, colors)
├─ .about, .about__title, .about__text (section styling)
├─ .container, .container__title, .container__list (main content styling)
├─ .button-center, button (button styling, hover/focus/active/disabled)
└─ @media (max-width: 600px) (responsive adjustments)

main.js
│
└─ Handles colorChangeButton click:
     └─ Changes document.body background color to a random pastel hue
 ```

### 3. Things I learned

- Semantic HTML matters : Using `<main>` and `<footer>` makes my page more accessible and organized.
- Small JavaScript safety checks prevents bugs: Checking if an element exists before adding an event listener   makes my design more responsive and user-friendly.
- CSS best practices: Using rem units, hover, active, and disabled states makes my design more responsive and user-friendly.


## Part B: Ethics and Risks of AI in Development

### 1. Incorrect or Misleading Code

**Risk:** AI tools can sometimes suggest code that looks correct but contains mistakes or is not best practice.

**What I will do:** In my portfolio project, I tested all AI-suggested code before keeping it. I also tried to understand the changes instead of copying blindly.

### 2. Not Understanding the Code

**Risk:** If I just accept AI suggestions without learning, I may not understand my own project.

**What I will do:** I read through HTML, CSS, and JavaScript carefully and made sure I understood what each change was doing.

### 3. Over-reliance on AI

**Risk:** Using AI too much can slow down my learning as a developer.

**What I will do:** I used AI as guidance, but I still wrote, adjusted, and tested the code myself ti improve my skills.

