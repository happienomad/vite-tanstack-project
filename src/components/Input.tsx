import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

interface InputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
    border: 1px solid var(--color-dark-300);
    border-radius: 4px;
    padding: var(--spacing-small);
    font-size: var(--typography--fontSize-base);
    width: 100%;
`;

function Input({ value, onChange }: InputProps) {
    return (
        <StyledInput type="text" value={value} onChange={onChange} />
    );
};

export default Input;