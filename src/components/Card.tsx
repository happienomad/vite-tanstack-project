import { PropsWithChildren } from "react";
import { styled } from "styled-components";


const StyledCard = styled.div`
    border: 1px solid var(--color-dark-300);
    border-radius: 4px;
    padding: var(--spacing-small);
    margin: var(--spacing-small) 0;
    box-shadow: var(--color-dark-300) 0px 3px 8px;
    display: block;
    width: 100%;
    box-sizing: border-box;
`;

export function Card({ children }: PropsWithChildren) {
    return (
        <StyledCard>
            {children}
        </StyledCard>
    );
}
