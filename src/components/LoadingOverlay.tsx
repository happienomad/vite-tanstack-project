import styled from "styled-components";
import { LoadingSpinner, LoadingSpinnerProps } from "./LoadingSpinner";

const StyledLoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledOverlayBackground = styled.div`
    background-color: var(--color-white);
    opacity: 0.7;
    position: absolute;
    width: 100%;
    height: 100%;
`

interface LoadingOverlayProps extends LoadingSpinnerProps {}

export function LoadingOverlay({ size = "medium" } : LoadingOverlayProps) {
    return <StyledLoadingOverlay>
        <StyledOverlayBackground />
        <LoadingSpinner size={size} />
    </StyledLoadingOverlay>
}