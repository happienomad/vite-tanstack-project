import { Link } from "@tanstack/react-router";
import styled from "styled-components";

const StyledLink = styled(Link)`
    border: none;
    border-radius: 10px;
    font-size: var(--typography--fontSize-base);
    padding: var(--spacing-small) var(--spacing-medium);
    text-decoration: none;
    background-color: var(--color-button-secondary);
    color: var(--text--color-secondary)};
`;

export { StyledLink as Link };