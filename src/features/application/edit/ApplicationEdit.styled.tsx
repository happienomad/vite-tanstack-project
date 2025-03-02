import { styled } from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: var(--spacing-small);
    height: 100vh;
`;

const ProductDetails = styled.div`
    grid-column: 1 / 2;
    display: grid;
    justify-content: center;
    align-items: start;
`

const ApplicationForm = styled.div`
    grid-column: 2 / 4;
`

export const StyledApplicationEdit = {
    Container,
    ProductDetails,
    ApplicationForm
}