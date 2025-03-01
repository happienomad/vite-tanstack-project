import { PropsWithChildren } from 'react';
import styled from 'styled-components';


interface BaseTypographyProps {
    element?: 'p' | 'span' | 'em' | 'strong';
    variant?: 'body1' | 'body2' | 'caption' | 'overline';
    fontSize: 'small' | 'base' | 'large' | 'larger';
    fontWeight?: 400 | 500 | 700;
    textCase?: "uppercase" | "lowercase" | "capitalize";
    emphasis?: "italic" | "highlight";
    textAlign?: "left" | "center" | "right";
    color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const StyledTypography = styled(({ element: Element = "p", ...props }: BaseTypographyProps) => <Element {...props} />)`
    text-transform: ${(props: BaseTypographyProps) => props.textCase || "none"};
    font-size: ${(props: BaseTypographyProps) => `var(--typography--fontSize-${props.fontSize})`};
    font-weight: ${(props: BaseTypographyProps) => props.fontWeight || 400};
    font-style: ${(props: BaseTypographyProps) => props.emphasis || "normal"};
    text-align: ${(props: BaseTypographyProps) => props.textAlign || "left"};
    color: ${(props: BaseTypographyProps) => `var(--color-${props.color || "dark"})`};
    `;

function Typography({ children, ...props }: PropsWithChildren<BaseTypographyProps>) {
    return (
        <StyledTypography {...props}>
            {children}
        </StyledTypography>
    );
}

export default Typography;