import { PropsWithChildren } from "react";
import styled from "styled-components";
import { XOR } from "ts-xor";

interface BaseButtonProps extends PropsWithChildren {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-expanded'?: boolean;
    'aria-haspopup'?: boolean;
    type?: 'button' | 'submit' | 'reset' | 'link';

}

interface ButtonActionProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMousDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}

interface ButtonAnchorProps {
    href: string;
    target: string;
}

type ButtonProps = BaseButtonProps & XOR<ButtonActionProps, ButtonAnchorProps>;



const StyledButton = styled.button<ButtonProps>`
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: var(--typography--fontSize-base);
    padding: var(--spacing-small) var(--spacing-medium);
    text-decoration: none;
    cursor: ${(props: ButtonProps) => props.disabled ? "default" : "pointer"};
    &:hover {
        background-color: var(--color-primary-hover);
    }
`;

// TODO: Update types to differentiate button and anchor props (XOR)
function Button({ onClick, children, href, target, ...buttonProps }: ButtonProps) {

    if (href) {
        return (
            <StyledButton as="a" href={href} target={target}>
                {children}
            </StyledButton>
        );
    }

    return (
        <StyledButton onClick={onClick} {...buttonProps}>
            {children}
        </StyledButton>
    );
}

export default Button;
