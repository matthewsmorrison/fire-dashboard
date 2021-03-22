import { db, auth } from 'helpers/firebase'
import { IncomeObject, ExpenseObject, InvestmentObject, LiabilityObject } from 'types'

// Initial State
let authObject: any
let authenticated = false
let error: string | null = null

export async function firebaseCreateUser(email: string, password: string) {
  try {
    authObject = await auth.createUserWithEmailAndPassword(email, password)
    authenticated = authObject.user === null ? false : true
    error = null
  } catch (e) {
    error = e.message
  }

  return { email, authObject, authenticated, error }
}

export async function firebaseSignIn(email: string, password: string) {
  try {
    authObject = await auth.signInWithEmailAndPassword(email, password)
    authenticated = authObject.user === null ? false : true
  } catch (e) {
    error = e.message
  }

  return { email, authObject, authenticated, error }
}

export async function firebaseSignInAnonymously() {
  try {
    authObject = await auth.signInAnonymously()
    authenticated = authObject.user === null ? false : true
  } catch (e) {
    error = e.message
  }

  return { authObject, authenticated, error }
}

export async function firebaseResetPassword(email: string) {
  await auth.sendPasswordResetEmail(email)
}

export async function firebaseSignOut() {
  await auth.signOut()
}

export const incomeObject: IncomeObject = {
  amount: 3000,
  growth: 0.03,
  name: 'Example Income',
  open: false,
  arrayPosition: 0,
  url: '',
  startDate: 2020,
  endDate: 2055
}

export const investmentObject: InvestmentObject = {
  open: false,
  url: '',
  name: 'Emergency Fund',
  growth: 0.02,
  fee: 0.01,
  emergencyFund: true,
  amount: 20000,
  startDate: 2020,
  arrayPosition: 0
}

export const houseInvestmentObject: InvestmentObject = {
  open: false,
  url: '',
  name: 'House',
  growth: 0.02,
  fee: 0.0,
  emergencyFund: false,
  amount: 200000,
  startDate: 2020,
  arrayPosition: 1
}

export const expenseObject: ExpenseObject = {
  open: false,
  url: '',
  name: 'Mortgage',
  amount: 554,
  growth: 0,
  startDate: 2020,
  endDate: 2050,
  arrayPosition: 0
}

export const secondExpenseObject: ExpenseObject = {
  open: false,
  url: '',
  name: 'General Expenses',
  amount: 700,
  growth: 0.03,
  startDate: 2020,
  endDate: 2100,
  arrayPosition: 1
}

export const liabilitiesObject: LiabilityObject = {
  open: false,
  url: '',
  name: 'House Mortgage',
  interestRate: 0.02,
  term: 30,
  interestOnly: false,
  amount: 150000,
  startDate: 2020,
  endDate: 2050,
  arrayPosition: 0
}

export async function firebaseCreateUserObject(response: any, callback: (r: any) => void) {
  const uid = response.authObject.user.uid

  try {
    db.doc('user/' + uid)
      .set({
        signedUpDate: new Date(Date.now()).toISOString(),
        currency: 'USD',
        age: 35,
        communityOptOut: true,
        income: [incomeObject],
        investments: [investmentObject, houseInvestmentObject],
        expenses: [expenseObject, secondExpenseObject],
        liabilities: [liabilitiesObject]
      })
      .then(() => {
        callback(response)
      })
      .catch((error: any) => console.error(error))
  } catch (e) {
    console.error(e)
  }
}
export async function firebaseVerifyEmail(email: string, password: string) {
  try {
    const result = await firebaseSignIn(email, password)
    if (result && result.authObject) {
      await result.authObject.user.sendEmailVerification()
      return { error: false, text: 'All OK' }
    } else return { error: true, text: result.error }
  } catch (error) {
    return { error: true, text: error }
  }
}
