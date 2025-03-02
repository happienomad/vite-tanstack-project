import { styled } from "styled-components";


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
    width: 80%;
    margin: var(--spacing-large) auto;
`

const Field = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
`

const Label = styled.div`
    grid-column: 1 / 2;
    font-size: var(--typography--fontSize-base)
`

const Input = styled.div`
    grid-column: 2 / 4;
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