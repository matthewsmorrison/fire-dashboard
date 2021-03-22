import React, { useEffect, useState } from 'react'
import { SidebarElement, SidebarLink, SidebarNonLink } from 'components/navBar/style'
import { DASHBOARD, INCOME, INVESTMENTS, EXPENSES, SETTINGS, LIABILITIES } from 'routes'
import { useAuthStore } from 'hooks/auth'
import { useApplicationStore } from 'hooks/application'
import { icon } from 'assets'
import CustomDialog from 'components/dialog'

const Sidebar: React.FC = () => {
  const [tab, selectTab] = useState<string>('')
  const { uid, signOut } = useAuthStore()
  const { getDetails } = useApplicationStore()

  const iconSize = '22px'

  useEffect(() => {
    const splitPath = window.location.pathname.split('/')
    selectTab(splitPath[splitPath.length - 1])
    if (uid) getDetails()
  }, [uid])

  const [signout, setSignout] = useState<boolean>(false)

  const confirmSignout = () => {
    signOut()
  }

  return (
    <SidebarElement>
      <SidebarLink
        selected={window.location.pathname.includes('dashboard')}
        to={DASHBOARD}
        onClick={() => selectTab('dashboard')}
      >
        <img src={icon.dashboard} style={{ height: iconSize, width: iconSize }} alt="dashboard icon" />
        <div style={{ marginLeft: '20px' }}>Dashboard</div>
      </SidebarLink>
      <SidebarLink
        selected={window.location.pathname.includes('income')}
        to={INCOME}
        onClick={() => selectTab('income')}
      >
        <img src={icon.income} style={{ height: iconSize, width: iconSize }} alt="income icon" />
        <div style={{ marginLeft: '20px' }}>Income</div>
      </SidebarLink>
      <SidebarLink
        selected={window.location.pathname.includes('expenses')}
        to={EXPENSES}
        onClick={() => selectTab('expenses')}
      >
        <img src={icon.coffee} style={{ height: iconSize, width: iconSize }} alt="expenses icon" />
        <div style={{ marginLeft: '20px' }}>Expenses</div>
      </SidebarLink>
      <SidebarLink
        selected={window.location.pathname.includes('assets')}
        to={INVESTMENTS}
        onClick={() => selectTab('assets')}
      >
        <img src={icon.savings} style={{ height: iconSize, width: iconSize }} alt="assets icon" />
        <div style={{ marginLeft: '20px' }}>Assets</div>
      </SidebarLink>
      <SidebarLink
        selected={window.location.pathname.includes('liabilities')}
        to={LIABILITIES}
        onClick={() => selectTab('liabilities')}
      >
        <img src={icon.liability} style={{ height: iconSize, width: iconSize }} alt="liabilities icon" />
        <div style={{ marginLeft: '20px' }}>Liabilities</div>
      </SidebarLink>

      <SidebarLink
        style={{ marginTop: 'auto' }}
        selected={tab === 'settings'}
        to={SETTINGS}
        onClick={() => selectTab('settings')}
      >
        <img src={icon.settings} style={{ height: iconSize, width: iconSize }} alt="settings icon" />
        <div style={{ marginLeft: '20px' }}>Settings</div>
      </SidebarLink>
      <SidebarNonLink selected={false} onClick={() => setSignout(true)}>
        <img src={icon.signout} style={{ height: iconSize, width: iconSize }} alt="signout icon" />
        <div style={{ marginLeft: '20px' }}>Sign Out</div>
      </SidebarNonLink>

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
    </SidebarElement>
  )
}

export default Sidebar
