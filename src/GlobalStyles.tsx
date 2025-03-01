import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
        font-family: 'Arial', sans-serif;
    }

    body {
        line-height: 1.5;
        background-color: #f8f9fa;
        color: var(--color-dark-700);
        margin: 0;
    }

    :root {
        --typography--fontSize-small: 0.75rem;
        --typography--fontSize-base: 1rem;
        --typography--fontSize-large: 1.25rem;
        --typography--fontSize-larger: 1.5rem;
        
        --typography--lineHeight-small: 1.2;
        --typography--lineHeight-base: 1.5;
        --typography--lineHeight-large: 1.8;
        --typography--lineHeight-larger: 2.1;

        --spacing-none: 0;
        --spacing-xsmall: 0.25rem;
        --spacing-small: 0.5rem;
        --spacing-base: 1rem;
        --spacing-medium: 1.25rem;
        --spacing-large: 1.5rem;
        --spacing-larger: 2rem;
        --spacing-xlarge: 3rem;

        --color-primary: #e91207;
        --color-primary-hover: #d41106;
        --color-secondary: #3d66b0;
        --color-success: #28a745;
        --color-danger: #dc3545;
        --color-warning: #ffc107;
        --color-info: #17a2b8;
        --color-light: #f8f9fa;
        --color-dark-700: #343a40;
        --color-dark-500: #495057;
        --color-dark-300: #ced4da;
        --color-dark-100: #e9ecef; 
    }
`;

export default GlobalStyles;