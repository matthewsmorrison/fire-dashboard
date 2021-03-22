export interface InvestmentObject {
  open: boolean
  url: string
  name: string
  growth: number
  fee: number
  emergencyFund: boolean
  amount: number
  startDate: number
  arrayPosition: number
}

export interface IncomeObject {
  open: boolean
  url: string
  name: string
  amount: number
  growth: number
  startDate: number
  endDate: number
  arrayPosition: number
}

export interface ExpenseObject {
  open: boolean
  url: string
  name: string
  amount: number
  growth: number
  startDate: number
  endDate: number
  arrayPosition: number
}

export interface LiabilityObject {
  open: boolean
  url: string
  name: string
  interestRate: number
  term: number
  interestOnly: boolean
  amount: number
  startDate: number
  endDate: number
  arrayPosition: number
}
