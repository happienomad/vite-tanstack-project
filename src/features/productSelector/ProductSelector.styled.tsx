import { styled } from "styled-components";
import { device } from "../../GlobalStyles";

export const StyledProductSelector = styled.div`
    display: grid;
    grid-template-rows : repeat(2, max-content)
    gap: var(--spacing-small);
    align-items: center;
`;

export const StyledProductsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xxlarge);
    margin: var(--spacing-base) 0;
    width: 100%;

    @media(${device.sm}) {
        grid-template-columns: repeat(2, max-content);
        justify-content: center;
    }
`;