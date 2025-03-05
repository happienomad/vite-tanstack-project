import { createGlobalStyle } from "styled-components";
import { ScreenSizesType } from "./global/types/styles";

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
        font-family: 'Arial', sans-serif;
    }

    body {
        font-family: Montserrat, sans-serif, Arial, Helvetica;
        line-height: 1.5;
        background-color: #f8f9fa;
        color: var(--color-dark-700);
        margin: 0;
    }

    :root {
        --typography--fontSize-xsmall: 0.5rem;
        --typography--fontSize-small: 0.75rem;
        --typography--fontSize-base: 1rem;
        --typography--fontSize-medium: 1.25rem;
        --typography--fontSize-large: 1.5rem;
        --typography--fontSize-larger: 1.75rem;
        --typography--fontSize-largest: 2rem;
        --typography--fontSize-extravagant: 2.25rem;
        
        --typography--lineHeight-xsmall: 1;
        --typography--lineHeight-small: 1.25;
        --typography--lineHeight-base: 1.5;
        --typography--lineHeight-medium: 1.75;
        --typography--lineHeight-large: 2;
        --typography--lineHeight-larger: 2.25;

        --spacing-none: 0;
        --spacing-xsmall: 0.25rem;
        --spacing-small: 0.5rem;
        --spacing-base: 1rem;
        --spacing-medium: 1.25rem;
        --spacing-large: 1.5rem;
        --spacing-larger: 2rem;
        --spacing-xlarge: 3rem;
        --spacing-xxlarge: 4rem;

        --color-primary: #e91207;
        --color-primary-hover: #d41106;
        --color-secondary: #e9ecef;
        --color-secondary-hover: #ced4da;
        --color-success: #28a745;
        --color-danger: #dc3545;
        --color-warning: #ffc107;
        --color-info: #17a2b8;
        --color-light: #f8f9fa;
        --color-dark-700: #343a40;
        --color-dark-500: #495057;
        --color-dark-300: #ced4da;
        --color-dark-100: #e9ecef; 
        --color-white: #FFF;
        --color-disabled:#b5bcc2;

        --color-button-primary: var(--color-primary);
        --color-button-primary-hover: var(--color-primary-hover);
        --color-button-secondary: var(--color-white);
        --color-button-secondary-hover: var(--color-dark-100); 

        --text--color-primary: #FFF;
        --text--color-secondary: #495057;

    }
`;

const size: {
    [key in ScreenSizesType]: string
} = {
    xs: '400px', // for small screen mobile
    sm: '600px', // for mobile screen
    md: '900px', // for tablets
    lg: '1280px', // for laptops
    xl: '1440px', // for desktop / monitors
    xxl: '1920px', // for big screens
}
  
export const device = {
xs: `(min-width: ${size.xs})`,
sm: `(min-width: ${size.sm})`,
md: `(min-width: ${size.md})`,
lg: `(min-width: ${size.lg})`,
xl: `(min-width: ${size.xl})`,
xxl: `(min-width: ${size.xxl})`,
}

export default GlobalStyles;