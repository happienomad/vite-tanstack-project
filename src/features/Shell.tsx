import { PropsWithChildren } from 'react';
import nestoLogo from './assets/nesto.svg';
import styled from 'styled-components';

const StyledShell = styled.div`
    display: grid;
    grid-template-rows: 4.8rem 1fr 3rem;
    height: 100vh;
`;

const Header = styled.header`
    width: 100%;
    padding : var(--spacing-small) var(--spacing-base);
    box-sizing: border-box;
    > img {
     max-height: 90%;
     }
    `;

const Main = styled.main`
    padding: var(--spacing-base);
    box-sizing: border-box;
`;

const Footer = styled.footer`
    padding: var(--spacing-small) var(--spacing-base);
    box-sizing: border-box;
    text-align: center;
    background-color: #f8f9fa;
    font-size: var(--typography--fontSize-small);
`

function Shell({ children }: PropsWithChildren) {
    return (
        <StyledShell>
            <Header>
                <img src={nestoLogo} alt="Nesto Logo" />
            </Header>
            <Main>
                {children}
            </Main>
            <Footer>
                <p>© 2025 Code Challenge</p>
            </Footer>
        </StyledShell>
    );
}

export default Shell;