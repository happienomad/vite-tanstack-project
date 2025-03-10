import { styled } from "styled-components";
import { device } from "../../../../GlobalStyles";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    width: 80%;
    margin: var(--spacing-large) auto;
`

const Field = styled.div`
    display: grid;
    grid-template-columns: 1fr;    
    grid-template-rows: auto;

    @media(${device.sm}) {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Label = styled.div`
    font-size: var(--typography--fontSize-base)

    @media(${device.md}) {
        grid-column: 1 / 2; 
    }
`

const Input = styled.div`
    @media(${device.md}) {
        grid-column: 2 / 4;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    gap: var(--spacing-base);
`

export const StyledForm = {
    Form,
    Field,
    Label,
    Input,
    ButtonContainer
}