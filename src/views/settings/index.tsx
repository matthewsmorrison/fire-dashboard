import React, { useState } from 'react'
import { DashboardContainer, TitleRow } from 'style'
import { useApplicationStore } from 'hooks/application'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { CURRENCY_CODES } from 'helpers/const'
import TextField from '@material-ui/core/TextField'
import { useAuthStore } from 'hooks/auth'
import CustomDialog from 'components/dialog'
import { auth } from 'helpers/firebase'
import * as firebase from 'firebase'
import MobileMenu from 'components/mobileMenu'

const Settings: React.FC = () => {
  const { email } = useAuthStore()
  const { age, setAge, setCurrency, currency } = useApplicationStore()
  const currencyCodes = Object.keys(CURRENCY_CODES).sort((a, b) => (a > b ? 1 : a < b ? -1 : 0))
  const [linkAccount, setLinkAccount] = useState<any>({
    open: false,
    email: '',
    password: ''
  })

  const confirmLinkAccount = async () => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(linkAccount.email, linkAccount.password)
      await auth.currentUser?.linkWithCredential(credential)
      alert(
        'Account link successful! A verification email has been to your email address. Please verify your email and login using these credentials next time.'
      )
      setLinkAccount({ open: false, email: '', password: '' })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        Settings
      </TitleRow>
      {!email && (
        <div style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
          <h4 style={{ marginBottom: '40px' }}>Account Settings</h4>
          <div style={{ marginBottom: '20px' }}>
            <p>
              To convert this account into a full account (with email and password) then please click{' '}
              <span
                style={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => setLinkAccount({ ...linkAccount, open: true })}
              >
                here
              </span>
              .
            </p>
          </div>
        </div>
      )}

      <div style={{ width: '100%', marginTop: '30px', padding: '20px' }}>
        <h4 style={{ marginBottom: '40px' }}>Application Settings</h4>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="currency-select">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            style={{ width: '50%' }}
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            label="Currency"
          >
            {currencyCodes.map((currencyCode: any, currencyCodeNumber: number) => {
              return (
                <MenuItem value={currencyCode} key={currencyCodeNumber}>
                  {`${currencyCode} - ${CURRENCY_CODES[currencyCode].name}`}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>
            This is your local currency and used for display purposes throughout the platform.
          </FormHelperText>
        </FormControl>
        <TextField
          id="new-age"
          variant="outlined"
          style={{ marginTop: '30px', width: '50%' }}
          label={'Your Age'}
          type="number"
          value={age}
          helperText={'This is used on your dashboard to present the age at which you will be financially independent.'}
          onChange={(event) => setAge(parseInt(event.target.value))}
        />
      </div>
      <CustomDialog
        open={linkAccount.open}
        handleClose={() => setLinkAccount(false)}
        handleSave={() => confirmLinkAccount()}
        title={'Link New Account'}
        buttonText={'Link Account'}
      >
        <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <p>You are able to link this anonymous account to an email by filling in the details below.</p>
          <TextField
            id={`email`}
            fullWidth
            style={{ marginTop: '30px', marginBottom: '30px' }}
            label={'Email'}
            type="email"
            helperText={'Please enter the email you would like to use for your new account.'}
            variant="outlined"
            value={linkAccount.email}
            onChange={(event) => setLinkAccount({ ...linkAccount, email: event.target.value })}
          />
          <TextField
            id={`email`}
            fullWidth
            style={{ marginBottom: '30px' }}
            label={'Password'}
            type="password"
            helperText={'Please enter the password you would like to use for your new account.'}
            variant="outlined"
            value={linkAccount.password}
            onChange={(event) => setLinkAccount({ ...linkAccount, password: event.target.value })}
          />
        </div>
      </CustomDialog>
    </DashboardContainer>
  )
}

export default Settings
