---
title: Introduction to React - by Jan Amann
---

# Introduction to React

by Jan Amann

<div style="text-align: right">
  <img style="width: 300px" src="images/react-logo.svg">
</div>

Note:

- Thanks for attending this lecture today.
- This is a preview of a lecture that is going to take place in the next winter semester. The actual lecture will be a bit longer, so today we're covering the first few basics
- My name is Jan and I'm a local freelancer from the area. I have a background both in software engineering as well as design.
- Working as a freelancer with some local startups and also international companies. React apps with an emhasis on user experience.
- And when I find some time between projects I also enjoy to work on open source projects and explore ideas.
- This lecture will introduce React from the conceptual perspective, will help you understand how to render user interfaces and also how to add basic interactivity
- If there are questions you're free to ask at any point

---

```jsx
function App() {
  return <p>Hello world!</p>;
}
```

Note:

- Who has seen code like this before?
- If you're like me, this looks easy.

---

<div style="display: flex; align-items: center; justify-content: center; height: 600px">
  <img src="images/unexpected-angle-bracket.png" />
</div>

Note:

- There's more to it. Browser doesn't understand this syntax, needs compiler.
- Not just technology-wise, but also architecture-wise.

---

<div class="code-huge">

```jsx
<App />
```

</div>

---

<div class="code-huge">

```jsx
<BigApp /> // ?
```

</div>

---

## What is **React**?

- A JavaScript library for building user interfaces
<!-- .element: class="fragment" -->
- Based on a syntax extension called JSX to describe markup
<!-- .element: class="fragment" -->
- Provides components as the main building block for apps
<!-- .element: class="fragment" -->

Note:
- **Interactive** user interfaces
- Heavily based on JavaScript and tries to avoid additional syntax for things like control flow

---

<div class="asset">
  <video controls autoplay loop muted playsinline src="https://cdn.dribbble.com/users/6252196/screenshots/15526059/media/c6b97ab963260981c654b85928bd7a25.mp4"></video>
</div>

<div class="asset-credits">
https://dribbble.com/shots/15526059-AR-Hotel-Finder-Exploration
</div>

---

## Why should you learn **React**?

---

## Developers like React

<div class="asset">
  <img src="images/state-of-js-frameworks-usage-2021.png" />
</div>

<div class="asset-credits">

[The State of JS 2021, Frontend frameworks usage](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks)

</div>

Note: Amount of JavaScript developers who have used React at some point

---

## Companies like React

- Meta (Facebook)
- Airbnb
- Spotify
- Instagram
- Netflix
- Twitter
- The New York Times
- Yahoo!
- Uber
- Discord
- Skype
- Pinterest
- … many more

---

## Conceptual background

Note: Can be used to evaluate the next big thing.

---

## State transitions

```mermaid
flowchart TD
  A-->B;
  B-->A;
```

---

## State transitions

```mermaid
flowchart TD
  A-->B;
  A-->C;
  C-->A;
  C-->B;
  B-->A;
  B-->C;
```

Note: 6 transitions

---

## States instead of transitions

```jsx
<App state="A" />
<App state="B" />
<App state="C" />
```

_Declarative_ instead of _imperative_.
<!-- .element: class="fragment" -->
_What_ instead of _how_.
<!-- .element: class="fragment" -->
html = view(state);
<!-- .element: class="fragment" -->

---

```jsx
document.body.innerHTML = <App state="A" />; // ?
document.body.innerHTML = <App state="B" />; // ?
```

Note:

This is what we do with purely server-side rendered apps.

Problems:
- Slow
- Form state would be blown away

---

```jsx
render(<App state="A" />);
render(<App state="B" />);

// Virtual DOM ⬇️

const appNode = ...;
appNode.textContent = 'B';

```

---

<div class="asset">
  <img src="images/separation-of-concerns-1.png" />
</div>

<p class="asset-credits">https://youtu.be/x7cQ3mrcKaY</p>

---

<div class="asset">
  <img src="images/separation-of-concerns-2.png" />
</div>

<p class="asset-credits">https://youtu.be/x7cQ3mrcKaY</p>

---

## React decouples the rendering target

1. Render in the browser
2. Render on the server
3. Render native apps (iOS, Android)
4. Render desktop applications
5. … many more

> Learn once, write anywhere. – React Native

<!-- .element: class="fragment" -->

---

## Architecture of React apps

```mermaid
graph TD;
  App-->TodoList;
  App-->CreateTodoForm
  TodoList-->TodoListItem1
  TodoList-->TodoListItem2
```

1. App is broken down into isolated pieces
2.
3. 

Note:
- Child components make none to very few assumptions about parents
- Complex problems are broken down into smaller ones which can be developed in an isolated way

---

## Architecture of React apps

```mermaid
graph TD;
  App-- todos -->TodoList;
  App-->CreateTodoForm
  TodoList-- todo1 -->TodoListItem1
  TodoList-- todo1 -->TodoListItem2
```

1. App is broken down into isolated pieces
2. Data flows top-down
3.

Note:
- Children declare a clear interface.
- Data isn't globally available

---

## Architecture of React apps

```mermaid
graph TD;
  App-- todos -->TodoList;
  App-->CreateTodoForm
  TodoList-- todo1 -->TodoListItem1
  TodoList-- todo1 -->TodoListItem2
  TodoListItem1-. onDeleteClick .->TodoList
  TodoList-. onDeleteTodo .->App
  CreateTodoForm-. onCreateTodo .->App
```

1. App is broken down into isolated pieces
2. Data flows top-down
3. Events flow bottom-up

Note:
- Parents can handle events
- Parents can intercept events (no two-way databinding)

---

## Rendering in React

---

## Hello world with JSX

```jsx
import {createRoot} from 'react-dom/client';

// Define the place in the markup where we render
const node = document.getElementById('root');
const root = createRoot(node);

// Lowercase tags are built-in browser primitives
root.render(<p>Hello world</p>);
```
<!-- .element: data-line-numbers="3,8-10" -->


Note: JSX is a syntax extension and needs a build tool.

---

## Props on native elements

```jsx
// … mostly map to HTML attributes
<p title="Hello">...</p>

// … with some exceptions
<p className="text">...</p>
```

```jsx
// … based on JavaScript APIs – not HTML
document.querySelector('.text').className = 'text';
```
<!-- .element: class="fragment" -->

---

## Components

```jsx

// … start with a capital letter
// … can accept arbitrary props
function Person(props) {
  // … return elements
  return <p>{props.firstName} {props.lastName}</p>;
}

root.render(<Person firstName="Grace" lastName="Hopper" />);
```

---

## Components

```jsx

// … start with a capital letter
// … can accept arbitrary props
function Person({firstName, lastName}) {
  // … return elements
  return <p>{firstName} {lastName}</p>;
}

root.render(<Person firstName="Grace" lastName="Hopper" />);
```

---

## "Escaping" into JavaScript

<div class="code-small">

```jsx

function Person({children, firstName, imageUrl, imageSize = 30}) {
  return (
    <div>
      <h1>{firstName.toUpperCase()}</h1>
```
```jsx
      <img
        src={imageUrl}
        alt={'Photo of ' + firstName}
        style={{width: imageSize, height: imageSize}}
      />
```
<!-- .element: class="fragment" -->
```jsx
      <p>{children}</p>
```
<!-- .element: class="fragment" -->
```jsx
    </div>
  );
}
```

```jsx
root.render(
  <Person firstName="Grace" imageUrl="/grace-hopper.jpg">
    was a pioneer of computer programming.
  </Person>
);
```
<!-- .element: class="fragment" -->

</div>

Note:

1. Within tags
2. Within attributes
3. Children are special

---

## Conditional rendering

<div class="code-small">

```jsx

function Person({firstName, lastName, isComputerScientist}) {
  let firstNameContent;
  if (firstName != null) {
    // … just a function call that returns a data structure
    firstNameContent = <p>{firstName.upperCase()}</p>;
  }

  return (
    <div>
      <h1>{firstNameContent}</h1>
```
```jsx
      <p>{lastName != null && lastName.toUpperCase()}</p>
```
<!-- .element: class="fragment" -->

```jsx
      <p>
        {isComputerScientist ? '… is a computer scientist' : '… had another profession'}
      </p>
```
<!-- .element: class="fragment" -->

```jsx
    </div>
  );
}
```

</div>

Note:
1. JSX elements can be assigned to variables
2. Ternaries are good for if/else
3. Booleans are not rendered

---

## Lists & loops

<div class="code-small">

```jsx

const inventors = [{
  id: '1',
  name: 'Grace Hopper',
}, {
  id: '2',
  name: 'Marie Curie'
}];

root.render(
  <div>
    {inventors.map((inventor) =>
      <Person key={inventor.id} name={inventor.name} />
    )}
  </div>
);
```

</div>

Note:
1. Since React uses JavaScript for rendering, we use it for loops as well
2. Keys need to be unique among siblings

---

## Interactivity

---

<section data-preload data-background-iframe="https://codesandbox.io/embed/react-lecture-counter-template-hjy4xg?hidenavigation=1&editorsize=80" data-background-interactive>

Note: https://codesandbox.io/s/react-lecture-counter-template-hjy4xg

---

## Rules for state

1. State is isolated to components
2. Computed values are derived
3. Use a single source of truth
4. Shared state is moved to nearest common parent

---

## Questions?
