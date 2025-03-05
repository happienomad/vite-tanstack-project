import { PropsWithChildren } from 'react';
import nestoLogo from '../assets/nesto.svg';
import translateIcon from "../assets/translate.svg";
import { Footer, Header, HeaderMenu, Main, MaxWidthContainer, StyledLayout } from './Layout.styled';
import { Trans } from '@lingui/react/macro';
import Button from '~/components/Button';
import { Link } from '~/components/Link';
import { i18n } from '@lingui/core';
import { dynamicActivate, LOCALES } from '~/i18n/i18n';

function Layout({ children }: PropsWithChildren) {

    const toggleTranslations = () => {
        const currentLocale = i18n.locale;

        // Just toggling between en-CA and fr-CA for the moment to confirm translations work
        void dynamicActivate(currentLocale === LOCALES.EnglishCA ? LOCALES.FrenchCA : LOCALES.EnglishCA);
        
    }
    return (
        <StyledLayout>
            <Header>
                <Link to="/">
                    <img src={nestoLogo} alt="Nesto Logo" />
                </Link>
                <HeaderMenu>
                    <Button variant="secondary" onClick={toggleTranslations}>
                        <img src={translateIcon} width="24" height="24" />
                    </Button>
                    <Link to="/applications">
                        <Trans>Applications</Trans>
                    </Link>
                </HeaderMenu>
            </Header>
            <Main>
                <MaxWidthContainer>
                    {children}
                </MaxWidthContainer>
            </Main>
            <Footer>
                <p>© 2025 Code Challenge</p>
            </Footer>
        </StyledLayout>
    );
}

export default Layout;