import styled from "styled-components";

export const Products = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        gap: var(--spacing-base);
        margin: var(--spacing-base) 0;
    `,
    List: styled.ul`
        display: flex;
        flex-direction: row;
        gap: var(--spacing-base);
        margin: 0;
        padding: 0;
    `,
    Card: styled.li`
        list-style-type: none;
        margin: 0;
    `
}
