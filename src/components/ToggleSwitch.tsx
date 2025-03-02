import { styled } from 'styled-components';

interface BaseToggleSwitchProps {
    checked: boolean;
}

interface ToggleSwitchProps extends BaseToggleSwitchProps {
    id: string;
    name: string;
    handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLabel: string;
    offLabel: string;
}


const StyledLabel = styled.label<BaseToggleSwitchProps>`
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: fit-content;
    border: 3px solid var(--color-dark-300);
    border-radius: 20px;
    background: var(--color-dark-100);
    font-weight: bold;
    color: var(--color-dark-300);
    cursor: pointer;

    + input {
        display: none;
    }

    &:before {
        content: "";
        position: absolute;
        top: 0px;
        left: ${(props: BaseToggleSwitchProps) => props.checked ? "0%" : "50%"};
        width: 50%;
        height: 100%;
        background: var(--color-dark-700);
        border-radius: 16px;
        transition: all 0.4s;
    }
     
    > * {
        padding: var(--spacing-xsmall) var(--spacing-large);
        text-align: center;
        text-transform: capitalize;  
        z-index: 1;
        color: var(--color-dark-700);
        &.active {
            color: var(--color-light)
        }       
    }
`;

function ToggleSwitch({ checked, id, name, onLabel, offLabel, handleToggle }: ToggleSwitchProps) {
    return (
        <>
            <StyledLabel checked={checked} htmlFor={id}>
                <div className={checked ? "active" : ""}>{onLabel}</div>
                <div className={checked ? "" : "active"}>{offLabel}</div>
            </StyledLabel>
            <input
                name={name}
                id={id}
                checked={checked}
                onChange={handleToggle}
                className="toggle-switch-checkbox"
                type="checkbox"
            />
        </>
    );
}

export default ToggleSwitch;