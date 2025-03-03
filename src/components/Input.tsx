import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface InputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    type?: "text" | "email";
}

const StyledInput = styled.input<InputProps>`
    border: 1px solid var(--color-dark-300);
    border-radius: 4px;
    padding: var(--spacing-small);
    font-size: var(--typography--fontSize-base);
    width: 100%;
    box-sizing: border-box;
`;

function Input({ value, onChange, ...inputProps }: InputProps) {
    return (
        <StyledInput type="text" value={value} onChange={onChange} {...inputProps} />
    );
};

export default Input;