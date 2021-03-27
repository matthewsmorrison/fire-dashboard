import React, { useState, useEffect } from 'react'
import { useAuthStore } from 'hooks/auth'
import { isValidEmail } from 'helpers/utils'
import { SIGNIN } from 'routes'
import { history } from 'helpers/history'

import {
  ForgotPasswordContainer,
  ForgotPasswordBox,
  StyledInput,
  ForgotPasswordButton,
  Options
} from 'views/auth/forgotPassword/style'

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuthStore()

  const [state, setState] = useState<any>({
    email: '',
    password: ''
  })

  const handleResetPassword = () => {
    if (isValidEmail(state.email)) {
      resetPassword(state.email)
      alert('You should receive a password reset link soon')
    }
  }

  const enterHandler = (keyPress: any) => {
    if (keyPress.key === 'Enter') {
      handleResetPassword()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', enterHandler)

    return () => {
      window.removeEventListener('keydown', enterHandler)
    }
    // eslint-disable-next-line
  }, [state.email])

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordBox>
        <div style={{ fontSize: '2rem', marginBottom: '3rem' }}>Forgot Password</div>
        <StyledInput
          placeholder="Email"
          id="email"
          autoComplete="on"
          type="email"
          value={state.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, email: event.target.value })}
        />
        <ForgotPasswordButton onClick={() => handleResetPassword()}>Reset Password</ForgotPasswordButton>
        <Options style={{ marginTop: '2rem' }}>
          <div style={{ flex: 1 }} onClick={() => history.push(SIGNIN)}>
            Back to Sign In
          </div>
        </Options>
      </ForgotPasswordBox>
    </ForgotPasswordContainer>
  )
}

export default ForgotPassword
