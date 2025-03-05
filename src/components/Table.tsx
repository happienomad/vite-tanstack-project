import { PropsWithChildren } from "react";
import styled from "styled-components"

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    overflow-x: auto;
    white-space: nowrap;
`;

const THead = styled.thead`
    height: 48px;
    background-color: var(--color-dark-100);
    td {
        font-weight: 600;
        padding: var(--spacing-base);
    }
`;

const TBody =  styled.tbody`
    height: 48px;
    background-color: var(--color-white);
    
    tr {
        border-top: 1px solid var(--color-dark-100);
        &:hover {
            background-color: var(--color-dark-100);
        }
        transition: all 0.2s ease-in;
    }
    
    td {
        padding: var(--spacing-base);
    }
`;

export const Table = ({ children } : PropsWithChildren) => {
    return <StyledTable>{children}</StyledTable>
}

Table.THead = THead;
Table.TBody = TBody;