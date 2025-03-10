import styled from "styled-components";

export const StyledApplicationList = {
    Container: styled.div`
        position: relative;
        border: 1px solid var(--color-dark-300);
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;
    `,
    OverflowContainer: styled.div`
        overflow: auto;
    `
}