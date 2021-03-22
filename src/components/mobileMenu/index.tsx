import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { MobileMenuItem } from './style'
import { useAuthStore } from 'hooks/auth'
import CustomDialog from 'components/dialog'

const menuPadding = '10px 20px'

const MobileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<any>(null)
  const [signout, setSignout] = useState<boolean>(false)
  const { signOut } = useAuthStore()

  const confirmSignout = () => {
    signOut()
  }

  return (
    <MobileMenuItem>
      <MenuIcon onClick={(event) => setMenuOpen(event.currentTarget)} />

      <Popover
        open={menuOpen !== null}
        anchorEl={menuOpen}
        onClose={() => setMenuOpen(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography style={{ padding: menuPadding }}>
          <Link to="/dashboard">Dashboard</Link>
        </Typography>
        <Typography style={{ padding: menuPadding }}>
          <Link to="/income">Income</Link>
        </Typography>
        <Typography style={{ padding: menuPadding }}>
          <Link to="/assets">Assets</Link>
        </Typography>
        <Typography style={{ padding: menuPadding }}>
          <Link to="/liabilities">Liabilities</Link>
        </Typography>
        <Typography style={{ padding: menuPadding }}>
          <Link to="/expenses">Expenses</Link>
        </Typography>
        <Typography style={{ padding: menuPadding }}>
          <Link to="/settings">Settings</Link>
        </Typography>

        <Typography style={{ padding: menuPadding }}>
          <div onClick={() => setSignout(true)}>Sign Out</div>
        </Typography>
      </Popover>

      <CustomDialog
        open={signout}
        handleClose={() => setSignout(false)}
        handleSave={() => confirmSignout()}
        title={'Confirm Sign Out'}
        buttonText={'Goodbye'}
      >
        <p>
          We are sad to see you go.
          <br />
          <br></br> If this is an anonymous account then your data will be lost.
        </p>
      </CustomDialog>
    </MobileMenuItem>
  )
}

export default MobileMenu
