# Customizable Code Snippets for React

A Feature-rich React component for displaying a snippet of code on your website

# Features

- Syntax highlighting using Prism.js
- 2 Default color themes to pick from
- Ability to define your own color themes
- When passing the code string, the prop is interpreted as a `Promise<string>`, so it is easy to load snippets from files
- Ability to highlight certain lines in the snippet using a special string syntax
- A powerful regex feature for customizing the inner content of code snippets to your liking

# Demo

First, import the component and css:

```jsx
import CodeSnippet from "customizable-code-snippets";
import "customizable-code-snippets/dist/style.css";
```
