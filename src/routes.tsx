import * as React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { useAuthStore } from 'hooks/auth'
import { ProtectedRoute, ProtectedRouteProps } from 'components/protectedRoute'

import SignIn from 'views/auth/signin'
import ForgotPassword from 'views/auth/forgotPassword'
import SignUp from 'views/auth/signup'
import NavBar from 'components/navBar'
import Dashboard from 'views/dashboard'
import Investments from 'views/investments'
import Liabilities from 'views/liabilities'
import Income from 'views/income'
import Settings from 'views/settings'
import Expenses from 'views/expenses'
import Home from 'views/home'

export const DASHBOARD = '/dashboard'
export const INCOME = '/income'
export const SETTINGS = '/settings'
export const INVESTMENTS = '/assets'
export const LIABILITIES = '/liabilities'
export const SIGNIN = '/signin'
export const FORGOTPASSWORD = '/forgotpassword'
export const SIGNUP = '/signup'
export const EXPENSES = '/expenses'
export const HOME = '/'

const Routes: React.FC = () => {
  const { uid } = useAuthStore()

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: uid !== undefined && uid !== null,
    isAllowed: true,
    restrictedPath: SIGNIN,
    authenticationPath: SIGNIN
  }

  const altProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: uid === null || uid === undefined,
    isAllowed: true,
    restrictedPath: DASHBOARD,
    authenticationPath: DASHBOARD
  }

  const path = window.location.pathname

  return (
    <>
      {path === SIGNIN || path === SIGNUP || path === FORGOTPASSWORD || path === HOME ? null : <NavBar />}
      <Switch>
        <Route exact={true} path={HOME} component={Home} />

        {/* Authenticated Routes */}
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={DASHBOARD} component={Dashboard} />
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={INCOME} component={Income} />
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={EXPENSES} component={Expenses} />
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={SETTINGS} component={Settings} />
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={INVESTMENTS} component={Investments} />
        <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path={LIABILITIES} component={Liabilities} />

        {/* Non-Authenticated Routes */}
        <ProtectedRoute {...altProtectedRouteProps} exact={true} path={SIGNIN} component={SignIn} />
        <ProtectedRoute {...altProtectedRouteProps} exact={true} path={FORGOTPASSWORD} component={ForgotPassword} />
        <ProtectedRoute {...altProtectedRouteProps} exact={true} path={SIGNUP} component={SignUp} />

        {/* Redirect if page isn't found */}
        <Route>
          <Redirect to={HOME} />
        </Route>
      </Switch>
    </>
  )
}

export default withRouter(Routes)
