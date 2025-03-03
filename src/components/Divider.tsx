import styled from "styled-components";

export interface DividerProps {
    direction: "horizontal" | "vertical";
}

export const Divider = styled.div.attrs<DividerProps>(({ direction }) => ({
    className: direction,
}))`
    &.horizontal {
        height: 1px;
        border-bottom: 1px solid var(--color-dark-300);
    }

    &.vertical {
        height: auto;
        border-right: 1px solid var(--color-dark-300);
    }
`;