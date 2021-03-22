import { createSlice } from '@reduxjs/toolkit'
import { InvestmentObject, IncomeObject, ExpenseObject, LiabilityObject } from 'types'

interface ApplicationState {
  loading: boolean
  age: number
  currency: string
  income: Array<IncomeObject>
  timeframe: number
  communityOptOut: boolean
  investments: Array<InvestmentObject>
  expenses: Array<ExpenseObject>
  liabilities: Array<LiabilityObject>
}

const initialState: ApplicationState = {
  loading: false,
  age: 30,
  currency: 'GBP',
  timeframe: 50,
  communityOptOut: true,
  income: [],
  investments: [],
  expenses: [],
  liabilities: []
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAllInformation(state, action) {
      const { age, currency, income, investments, expenses, liabilities, communityOptOut, loading } = action.payload
      state.loading = loading
      state.age = age
      state.communityOptOut = communityOptOut
      state.currency = currency
      state.expenses = expenses
      state.income = income
      state.investments = investments
      state.liabilities = liabilities
    },
    setTimeframe(state, action) {
      const { timeframe } = action.payload
      state.timeframe = timeframe
    },
    setExpenses(state, action) {
      const { expenses } = action.payload
      state.expenses = expenses
    },
    setCommunityOptOut(state, action) {
      const { communityOptOut } = action.payload
      state.communityOptOut = communityOptOut
    },
    setIncome(state, action) {
      const { income } = action.payload
      state.income = income
    },
    setInvestments(state, action) {
      const { investments } = action.payload
      state.investments = investments
    },
    setLiabilities(state, action) {
      const { liabilities } = action.payload
      state.liabilities = liabilities
    },
    setCurrency(state, action) {
      const { currency } = action.payload
      state.currency = currency
    },
    setAge(state, action) {
      const { age } = action.payload
      state.age = age
    }
  }
})

export const {
  setCurrency,
  setAge,
  setAllInformation,
  setTimeframe,
  setCommunityOptOut,
  setExpenses,
  setLiabilities,
  setIncome,
  setInvestments
} = applicationSlice.actions

export default applicationSlice.reducer
