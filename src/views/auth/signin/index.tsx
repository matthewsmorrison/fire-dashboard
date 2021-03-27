import React, { useState, useEffect } from 'react'
import { useAuthStore } from 'hooks/auth'
import { SignInContainer, SignInBox, StyledInput, SignInButton, Options } from 'views/auth/signin/style'
import { SIGNUP, FORGOTPASSWORD } from 'routes'
import { history } from 'helpers/history'
import { isValidEmail } from 'helpers/utils'

const SignIn: React.FC = () => {
  const { signInWithFirebase, signInAnonymously, errorMessage, setErrorMessage } = useAuthStore()

  const [state, setState] = useState<any>({
    email: '',
    password: '',
    inputError: ''
  })

  const enterHandler = (keyPress: any) => {
    if (keyPress.key === 'Enter' && isValidEmail(state.email)) {
      signInWithFirebase(state.email, state.password)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', enterHandler)
    setErrorMessage('')
    return () => {
      window.removeEventListener('keydown', enterHandler)
    }
    // eslint-disable-next-line
  }, [state.email, state.password])

  return (
    <SignInContainer>
      <SignInBox>
        <div style={{ fontSize: '2rem', marginBottom: '3rem' }}>Login</div>
        <StyledInput
          placeholder="Email"
          autoComplete="on"
          id="email"
          type="email"
          value={state.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, email: event.target.value })}
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
        <SignInButton style={{ marginBottom: '5px' }} onClick={() => signInWithFirebase(state.email, state.password)}>
          Sign In
        </SignInButton>
        or
        <br />
        <SignInButton style={{ marginTop: '10px' }} onClick={() => signInAnonymously()}>
          Try Anonymously
        </SignInButton>
        <Options style={{ marginTop: '2rem' }}>
          <div style={{ flex: 1 }} onClick={() => history.push(SIGNUP)}>
            Sign Up
          </div>
          <div style={{ flex: 1 }} onClick={() => history.push(FORGOTPASSWORD)}>
            Forgot Password?
          </div>
        </Options>
      </SignInBox>
    </SignInContainer>
  )
}

export default SignIn
