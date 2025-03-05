import { PropsWithChildren } from "react";
import styled from "styled-components";
import { XOR } from "ts-xor";

interface BaseButtonProps extends PropsWithChildren {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-expanded'?: boolean;
    'aria-haspopup'?: boolean;
    variant?: 'primary' | 'secondary'
}

interface ButtonActionProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | 'link';
}

interface ButtonAnchorProps {
    href: string;
    target?: string;
}

type ButtonProps = BaseButtonProps & XOR<ButtonActionProps, ButtonAnchorProps>;



export const StyledButton = styled.button<ButtonProps>`
    border: none;
    border-radius: 8px;
    font-size: var(--typography--fontSize-base);
    padding: var(--spacing-small) var(--spacing-medium);
    text-decoration: none;
    cursor: ${(props: ButtonProps) => props.disabled ? "default" : "pointer"};
    background-color: ${(props: BaseButtonProps) => `var(--color-button-${props.variant})`};
    color: ${(props: BaseButtonProps) => `var(--text--color-${props.variant})`};
    transition: all 0.1s ease-in;

    &:hover {
        background-color: ${(props: BaseButtonProps) => `var(--color-button-${props.variant}-hover)`};
    }

    &:disabled {
        background-color: var(--color-dark-300);
        color: var(--color-dark-500);
        cursor: not-allowed;
    }
`;

// TODO: Update types to differentiate button and anchor props (XOR)
function Button({ onClick, onKeyPress, children, variant = "primary", href, target, ...buttonProps }: ButtonProps) {

    if (href) {
        return (
            <StyledButton as="a" href={href} target={target} variant={variant}>
                {children}
            </StyledButton>
        );
    }

    return (
        <StyledButton onClick={onClick} onKeyPress={onKeyPress} {...buttonProps} variant={variant}>
            {children}
        </StyledButton>
    );
}

export default Button;
