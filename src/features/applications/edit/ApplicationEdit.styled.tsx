import { styled } from "styled-components";
import { device } from "../../../GlobalStyles";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: var(--spacing-large);
    margin: 0 auto;

    @media(${device.sm}) {
        flex-direction: row;
        align-items: start;
        grid-gap: var(--spacing-xxlarge);
    }
`;

const ProductDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
`

const ApplicationForm = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const StyledApplicationEdit = {
    Container,
    ProductDetails,
    ApplicationForm,
}