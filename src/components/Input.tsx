import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export interface InputProps {
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?:(event: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    type?: "text" | "email" | "tel";
    id: string;
}

const StyledInput = styled.input<InputProps>`
    border: 1px solid var(--color-dark-300);
    border-radius: 4px;
    padding: var(--spacing-small);
    font-size: var(--typography--fontSize-base);
    width: 100%;
    box-sizing: border-box;
`;

function Input({ value, id, onChange, ...inputProps }: InputProps) {
    return (
        <StyledInput id={id} type="text" value={value} onChange={onChange} {...inputProps} />
    );
};

export default Input;