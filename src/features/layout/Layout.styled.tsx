import styled from "styled-components";
import { device } from "../../GlobalStyles";

export const StyledLayout = styled.div`
    display: grid;
    grid-template-rows: 4.8rem 1fr 3rem;
    height: 100vh;
`;

export const Header = styled.header`
    width: 100%;
    box-sizing: border-box;
    img {
     max-height: 70%;
     }
    display: flex;
    justify-content: space-between;

    @media(${device.sm}) {
        padding : var(--spacing-small) var(--spacing-large);

        img {
            max-height: 90%;
        }
    }
`;

export const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-small);
`

export const Main = styled.main`
    box-sizing: border-box;
    overflow-y: auto;
    padding: var(--spacing-small);
`;

export const MaxWidthContainer = styled.div`
    max-width: 96vw;
    margin: 0 auto;

    @media(${device.sm}) {
        max-width: 76vw;
    }

    @media(${device.lg}) {
        max-width: 64vw;
    }
`

export const Footer = styled.footer`
    padding: var(--spacing-small) var(--spacing-base);
    box-sizing: border-box;
    text-align: center;
    background-color: #f8f9fa;
    font-size: var(--typography--fontSize-small);
`;