import { useState } from 'react'
import * as firebase from 'firebase/app'
import { analytics } from 'helpers/firebase'
import {
  firebaseSignIn,
  firebaseSignInAnonymously,
  firebaseCreateUser,
  firebaseSignOut,
  firebaseResetPassword,
  firebaseCreateUserObject
} from 'helpers/firebaseAuth'
import { DASHBOARD, HOME } from 'routes'
import { history } from 'helpers/history'

interface AuthenticationState {
  auth: any
  authenticated: boolean
  uid: string
  email: string
}

export function useAuthStore() {
  const authenticationObject: any = localStorage.getItem('authUser')
  const jsonAuthenticationObject = authenticationObject && JSON.parse(authenticationObject)
  const email = jsonAuthenticationObject && jsonAuthenticationObject.email
  const uid = jsonAuthenticationObject && jsonAuthenticationObject.uid
  const [errorMessage, setErrorMessage] = useState<string>('')

  function handleAuthentication(response: any) {
    if (response.authenticated) {
      const authObject = response.authObject
      if (authObject !== undefined && authObject.user !== null) {
        const authResponse: AuthenticationState = {
          auth: JSON.stringify(authObject.user),
          authenticated: true,
          uid: authObject.user.uid,
          email: authObject.user.email ? authObject.user.email : ''
        }
        localStorage.setItem('authUser', authResponse.auth)
        history.push(DASHBOARD)
      }
    }
  }

  firebase.auth().onIdTokenChanged((user) => {
    if (user && user.uid) {
      analytics.setUserId(user.uid)
      const isCustomer = user.uid !== 'MgOsCSmlrgcdmrzQ67fRCGPtY0G3' ? 'yes' : 'no'
      analytics.setUserProperties({ customer: isCustomer })

      const email = user.email
      const uid = user.uid
      if (uid) {
        const authResponse: AuthenticationState = {
          auth: JSON.stringify(user),
          authenticated: true,
          uid: uid,
          email: email ? email : ''
        }

        localStorage.setItem('authUser', authResponse.auth)
      }
    } else {
      localStorage.removeItem('authToken')
    }
  })

  function signUpWithFirebase(email: string, password: string) {
    localStorage.removeItem('authUser')
    firebaseCreateUser(email, password).then((response) => {
      if (response && !response.error) {
        if (response.authObject && response.authObject.user) {
          firebaseCreateUserObject(response, function () {})
          firebaseSignOut().then(() => {
            localStorage.removeItem('authUser')
            response.authObject.user.sendEmailVerification()
            setErrorMessage('Your email address needs to be verified. A verification email has been sent.')
          })
        }
      } else {
        if (response.error) setErrorMessage(response.error)
        else setErrorMessage('Something went wrong. Please try again.')
      }
    })
  }

  function signInWithFirebase(email: string, password: string) {
    localStorage.removeItem('authUser')
    firebaseSignIn(email, password).then((response) => {
      if (response && response.authObject && response.authObject.user) {
        if (response.authObject.user.emailVerified) {
          handleAuthentication(response)
        } else {
          firebaseSignOut().then(() => {
            localStorage.removeItem('authUser')
            response.authObject.user.sendEmailVerification()
            setErrorMessage('Your email address needs to be verified. A verification email has been sent.')
          })
        }
      } else {
        if (response.error) setErrorMessage(response.error)
        else setErrorMessage('Something went wrong. Please try again.')
      }
    })
  }

  async function signInAnonymously() {
    const { authObject, authenticated } = await firebaseSignInAnonymously()
    if (authenticated) {
      firebaseCreateUserObject({ authObject }, () => {})
      handleAuthentication({ authObject, authenticated })
    }
  }

  function signOut() {
    firebaseSignOut().then(() => {
      localStorage.removeItem('authUser')
      history.push(HOME)
    })
  }

  return {
    uid,
    email,
    errorMessage,
    signUpWithFirebase,
    signInWithFirebase,
    signInAnonymously,
    resetPassword: firebaseResetPassword,
    setErrorMessage,
    signOut
  }
}
