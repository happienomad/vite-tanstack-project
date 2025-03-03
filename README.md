# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Tech Stack choices

React + Typescript is the default choice as per the instructions. The other tooling that I used to build this project are as follows 

- Vite Server
- Tanstack Router
- Lingui
- Vitest + React Testing Library
- Axios


Questions

1. Are there any restrictions on the libraries that can be used? Instructions document recommends not using frameworks for css and I am totally onboard with it, but I would like to know if there any strong objections in using libraries like react-hook-form or date-fns etc
2. I see there is a requirement to add a view that lists all the completed applications. 
  - Is this view open for everyone? 
  - Should there be a link somewhere on the application to access this list view? 
  - Should the list be paginated?
3. I am not sure about the requirements of **screen 1**. This particular point " - display two lists of one or more of the **best** mortgage products(s), one list for each type of mortgage" is not clear to me. Does this mean there can be more than one product of same type with a **best** mortgage rate? 
4. This is a clarification question to if there will be multiple products of same type with **best** mortgage rate. The `Home` screen mockup displays **fixed** and **variable** mortgage options side by side, but I believe this layout may not be ideal when there are more than one product of same type. Would it be acceptable if I add a toggle to switch between fixed and variable lists instead?