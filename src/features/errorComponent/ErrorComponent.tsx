import { Trans } from "@lingui/react/macro";
import styled from "styled-components";
import { Typography } from "~/components/Typography";

const StyledErrorComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: var(--color-danger);
    font-size: var(--typography--fontSize-medium);
`

export function ErrorComponent() {
    return <StyledErrorComponent>
        <Typography fontSize="medium">
            <Trans>
                Something went wrong!
            </Trans>
        </Typography>
    </StyledErrorComponent>
}