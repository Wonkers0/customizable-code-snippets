# Customizable Code Snippets for React

A Feature-rich React component for displaying a snippet of code on your website
```sh
npm install customizable-code-snippets@latest
```

# Features

- Syntax highlighting using Prism.js
- 2 Default color themes to pick from
- Ability to define your own color themes
- When passing the code string, the prop is interpreted as a `Promise<string>`, so it is easy to load snippets from files
- Ability to highlight certain lines in the snippet using a special string syntax
- A powerful regex feature for customizing the inner content of code snippets to your liking

# 📦 Demo

First, import the component and css:

```jsx
import CodeSnippet from "customizable-code-snippets";
import "customizable-code-snippets/dist/style.css";


const codeSnippet = `var fruits = ["apple", "mango", "watermelon", "orange"];
 
var even_fruits = fruits.filter(ele => ele.length % 2 !== 0);
 
console.log(even_fruits)`;

function App() {
  return <CodeSnippet code={codeSnippet} language="js" />;
}

export default App;
```

### Output:
![](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/b311e69e-ce42-419a-af54-aa79dfa8ce8a)


# 🎨 Themes
You can choose from [one of the pre-defined themes](https://github.com/Wonkers0/customizable-code-snippets/blob/main/lib/themes.json) through the `themeName` prop, or you can make your own using the `customTheme` prop.

## Pre-defined Theme
```tsx
function App() {
  return <CodeSnippet code={codeSnippet} language="js" themeName="react-docs" />;
}
```

### Output:
![](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/05668db6-0da7-46dc-bd76-352bbe36f0ca)


## Custom Theme
```tsx
function App() {
  return (
    <CodeSnippet
      code={codeSnippet}
      language="js"
      customTheme={{ // Adapted version of "Do You Even Dev, Bro?" theme by Jarmen Kell
        function: "#9cdcfe", // Function or method names (e.g. console.*log*, function *example*(), etc.)
        keyword: "#fb5474", // Keywords such as "await", "async", "return", "continue", etc.
        boolean: "#9cdcfe", // Booleans (true/false)
        string: "#d0cbeb", // Strings
        number: "#fb5474", // Numbers
        comment: "#7f848e", // Comments (// or /* ... */)
        background: "#030c1b", // Background color of the code snippet
        tag: "#fbe179", // HTML tags such as <div>, <p>, <a>, etc.
        highlight: "#fffbdd19", // The color of a highlighted line. This should usually have a low opacity.
        default: "#c0c0c0", // Any other text that is not defined above, such as brackets, braces, etc.
      }}
    />
  );
}
```

### Output:
![](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/fac9bddb-94e5-4173-afec-7e6ba91ab9aa)

# 💡 Highlight Certain Lines
You can highlight certain lines in your code snippet using the following syntax in the `highlightedLinesPattern` prop:

```tsx
function App() {
  return (
    <CodeSnippet
      code={codeSnippet}
      language="js"
      themeName="react-docs"
      highlightedLinesPattern="1-4,7" // Highlight lines 1 through 4, and line 7
    />                                // Line #s start at 1
  );
}
```

### Output:
![](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/c5a91008-2b7d-47ce-bf39-82810880fb8c)

# 📏 Syntax Rules
Syntax rules provide a powerful way to customize the inner content of code snippets according to your specific requirements. With syntax rules, you can define patterns and replacement functions to transform or highlight specific parts of the code snippet.

At its core, the `syntaxRules` prop is an object of type `Record<SyntaxIdentifier, SyntaxRule[]>`. This means that for the keys of the object you need to pass in the name of a type of syntax (such as "string", "function", etc.); you can see the syntax identifier of each part of your snippet in the DOM after your code snippet has loaded:

![Syntax identifiers under the "data-syntaxidentifier" attribute, seen in Chrome DevTools](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/dc50cc24-d9c4-4140-888c-ab2969de1eb0)

So a syntax rule record might look like:
```js
{
  "string": [/* SyntaxRule[] */],
  "boolean": [/* SyntaxRule[] */],
  // ...
}
```

## Syntax Rule Class
First, import the class like so:
```ts
import SyntaxRule from "customizable-code-snippets/dist/SyntaxRule";
```

For the values of the `syntaxRules` prop, you need to pass an array of type `SyntaxRule[]`. The constructor of the `SyntaxRule` class takes in a regex pattern and a callback function.

The regex pattern will be matched against the content of all of the syntax identifiers of the specified type in the code snippet, and the matches will be passed to the syntax rule callback function, along with a unique ID for the match to help you set the `key` attribute in case you are returning a JSX Element from your callback function. This is because **the return value from the callback function will replace the regex match**

Example:
```tsx
function App() {
  return (
    <CodeSnippet
      code={codeSnippet}
      language="js"
      syntaxRules={{
        string: [
          new SyntaxRule(
            /apple/,
            (match: string, uniqueID: number): string | JSX.Element => (
              <span key={`${match}_${uniqueID}`} className="highlightedSyntax">
                {match}
              </span>
            )
          ),
        ],
      }}
    />
  );
}
```

You can then style this span in your css:
```css
.highlightedSyntax {
  padding: 2px 3px;
  background-color: rgba(255, 165, 47, 0.7);
  box-shadow: 0 3px rgba(255, 165, 47, 0.5);
  border-radius: 2px;

  margin: 0 2px;
}
```

Output:
![](https://github.com/Wonkers0/customizable-code-snippets/assets/106038003/17e32fa8-9fc4-4bff-9cc9-123ff526af99)

# ✏ Custom Code Snippet Class Name & ID
If you wish to change the code-snippet styles like its border radius and such, you can specify a custom `className` or `id` on the top level wrapper of the code snippet using the `className` and `id` props, respectively.

## Show your support
Give a ⭐️ if this project helped you!
