import React, { useState, useEffect } from 'react'
import { useAuthStore } from 'hooks/auth'
import { isValidEmail } from 'helpers/utils'
import { SIGNIN } from 'routes'
import { history } from 'helpers/history'

import { SignUpContainer, SignUpBox, StyledInput, SignUpButton, Options } from 'views/auth/signup/style'

const SignUp: React.FC = () => {
  const { signUpWithFirebase, errorMessage, setErrorMessage } = useAuthStore()

  const [state, setState] = useState<any>({
    email: '',
    password: ''
  })

  const handleSignUp = () => {
    if (isValidEmail(state.email)) {
      setState({ ...state, error: null })
      signUpWithFirebase(state.email, state.password)
    }
  }

  const enterHandler = (keyPress: any) => {
    if (keyPress.key === 'Enter') {
      handleSignUp()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', enterHandler)
    setErrorMessage('')

    return () => {
      window.removeEventListener('keydown', enterHandler)
    }
  }, [state.email, state.password])

  return (
    <SignUpContainer>
      <SignUpBox>
        <div style={{ fontSize: '2rem', marginBottom: '3rem' }}>Sign Up</div>
        {errorMessage !== 'Your email address needs to be verified. A verification email has been sent.' && (
          <>
            <StyledInput
              autoComplete="on"
              id="email"
              placeholder="Email"
              type="email"
              value={state.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, email: event.target.value })
              }
            />
            <StyledInput
              placeholder="Password"
              type="password"
              value={state.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, password: event.target.value })
              }
            />
            {errorMessage !== '' && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
            <SignUpButton onClick={() => handleSignUp()}>Sign Up</SignUpButton>
          </>
        )}
        {errorMessage === 'Your email address needs to be verified. A verification email has been sent.' && (
          <p>A verification email has been sent to your email address. Once verified you will be able to sign in.</p>
        )}
        <Options style={{ marginTop: '2rem' }}>
          <div style={{ flex: 1 }} onClick={() => history.push(SIGNIN)}>
            Already have an account? Sign In
          </div>
        </Options>
      </SignUpBox>
    </SignUpContainer>
  )
}

export default SignUp
