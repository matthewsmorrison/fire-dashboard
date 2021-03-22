import styled from "styled-components"

export const ForgotPasswordContainer = styled.div`
    display: flex;
    padding: 2rem;
    justify-content: center;
    height: 100%;
`

export const ForgotPasswordBox = styled.div`
    display: flex;
    flex-direction: column;
    align-content: stretch;
    padding: 2rem;
    width: 350px;
    height: 450px;
    margin-top: 4rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.16);
    align-items: center;
`

export const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 1rem;
    outline: 0;
    border: 0;
    height: 50px;
    padding: 1rem;
    border-bottom: 2px solid #ebeaeb;
`

export const ForgotPasswordButton = styled.button`
    margin-top: auto;
    font-size: 1.25rem;
    cursor: pointer;
    padding: .75rem 1rem;
    background-color: #4A83F3;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 2px;  
    color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
    border-image: initial;
    border-radius: 4px;
    transition: background 0.2s ease-in-out 0s;
    background: rgb(74, 131, 243);

    &:hover {
        background: rgb(41, 110, 248);
    }

    &:focus {
        outline: 0;
    }
`

export const Options = styled.div`
    font-family: Open Sans,"Helvetica",Arial,sans-serif;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    text-align: center;
    align-content: center;
    cursor: pointer;
`