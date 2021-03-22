import styled from 'styled-components'

export const SubscribeButton = styled.button`
  margin-top: 20px;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  background-color: #4a83f3;
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

  &:disabled {
    cursor: wait;
    opacity: 0.5;
  }

  &:focus {
    outline: 0;
  }
`
