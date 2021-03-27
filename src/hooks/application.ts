import { useDispatch, useSelector } from 'react-redux'
import { db } from 'helpers/firebase'
import {
  setAllInformation,
  setIncome,
  setInvestments,
  setCurrency,
  setAge,
  setExpenses,
  setLiabilities,
  setTimeframe,
  setCommunityOptOut
} from 'services/application'
import { useAuthStore } from 'hooks/auth'
import * as firebase from 'firebase/app'
import { InvestmentObject, IncomeObject, ExpenseObject, LiabilityObject } from 'types'
import { PMT } from 'helpers/utils'
import {
  incomeObject,
  investmentObject,
  houseInvestmentObject,
  expenseObject,
  secondExpenseObject,
  liabilitiesObject
} from 'helpers/firebaseAuth'

export function useApplicationStore(): any {
  const dispatch = useDispatch()
  const { uid, signOut } = useAuthStore()
  const age = useSelector((state: any) => state.application.age)
  const timeframe = useSelector((state: any) => state.application.timeframe)
  const currency = useSelector((state: any) => state.application.currency)
  const wageGrowth = useSelector((state: any) => state.application.wageGrowth)
  const expenses = useSelector((state: any) => state.application.expenses)
  const loading = useSelector((state: any) => state.application.loading)
  const income = useSelector((state: any) => state.application.income)
  const investments = useSelector((state: any) => state.application.investments)
  const liabilities = useSelector((state: any) => state.application.liabilities)
  const communityOptOut = useSelector((state: any) => state.application.communityOptOut)
  const thisYear = new Date().getFullYear()

  const removeScenarios = () => {
    dispatch(
      setAllInformation({
        age,
        communityOptOut,
        currency,
        expenses: expenses.filter((expense) => expense.name !== 'Scenario Expense'),
        income: income.filter((income) => income.name !== 'Scenario Income'),
        investments,
        loading,
        liabilities
      })
    )
  }

  const getDetails = async () => {
    dispatch(
      setAllInformation({ age, communityOptOut, currency, expenses, income, investments, liabilities, loading: true })
    )
    db.collection('user')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.data()) {
          const data = doc.data()
          if (data) {
            dispatch(setAllInformation({ ...data, loading: false }))
          }
        } else {
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
              dispatch(
                setAllInformation({
                  signedUpDate: new Date(Date.now()).toISOString(),
                  currency: 'USD',
                  age: 35,
                  communityOptOut: true,
                  income: [incomeObject],
                  investments: [investmentObject, houseInvestmentObject],
                  expenses: [expenseObject, secondExpenseObject],
                  liabilities: [liabilitiesObject],
                  loading: false
                })
              )
            })
        }
      })
      .catch((error) => {
        console.error(error)
        signOut()
      })
  }

  const _setCurrency = (currency) => {
    db.collection('user').doc(uid).update({
      currency: currency
    })
    dispatch(setCurrency({ currency }))
  }

  const _setCommunityOptOut = (optOut: boolean) => {
    db.collection('user').doc(uid).update({
      communityOptOut: optOut
    })
    dispatch(setCommunityOptOut({ communityOptOut: optOut }))
  }

  const _setAge = (age) => {
    db.collection('user').doc(uid).update({
      age: age
    })
    dispatch(setAge({ age }))
  }

  const _setTimeframe = (timeframe) => {
    dispatch(setTimeframe({ timeframe }))
  }

  const calculateTotalMonthlyIncome = (income) => {
    let totalIncome = 0
    const finalYear = thisYear + timeframe + 2

    for (let i = 0; i < income.length; i++) {
      const thisIncome = income[i]
      const startDate = thisIncome.startDate ? thisIncome.startDate : thisYear
      const endDate = thisIncome.endDate ? thisIncome.endDate : finalYear
      if (thisYear >= startDate && thisYear < endDate) totalIncome += thisIncome.amount
    }
    return totalIncome
  }

  const calculateTotalMonthlyExpense = (expenses) => {
    let totalExpenses = 0
    const finalYear = thisYear + timeframe + 2

    for (let i = 0; i < expenses.length; i++) {
      const thisExpense = expenses[i]
      const startDate = thisExpense.startDate ? thisExpense.startDate : thisYear
      const endDate = thisExpense.endDate ? thisExpense.endDate : finalYear
      if (thisYear >= startDate && thisYear < endDate) totalExpenses += thisExpense.amount
    }
    return totalExpenses
  }

  const calculateTotalInvestments = (investments) => {
    let totalInvestments = 0
    for (let i = 0; i < investments.length; i++) {
      const thisInvestment = investments[i]
      const startDate = thisInvestment.startDate ? thisInvestment.startDate : thisYear
      if (thisYear >= startDate) totalInvestments += investments[i].amount
    }
    return totalInvestments
  }

  const calculateTotalAssets = (investments) => {
    let totalInvestments = 0
    for (let i = 0; i < investments.length; i++) {
      totalInvestments += investments[i].amount
    }
    return totalInvestments
  }

  const calculateTotalLiabilities = (liabilities) => {
    let totalLiabilities = 0
    const finalYear = thisYear + timeframe + 2
    for (let i = 0; i < liabilities.length; i++) {
      const thisLiability = liabilities[i]
      const startDate = thisLiability.startDate ? thisLiability.startDate : thisYear
      const endDate = thisLiability.endDate ? thisLiability.endDate : finalYear
      if (thisYear >= startDate && thisYear < endDate) totalLiabilities += thisLiability.amount
    }
    return totalLiabilities
  }

  const calculateEmergencyFund = (investments) => {
    let totalInvestments = 0
    for (let i = 0; i < investments.length; i++) {
      if (investments[i].emergencyFund) totalInvestments += investments[i].amount
    }
    return totalInvestments
  }

  const addNewIncome = (newIncome: IncomeObject) => {
    db.collection('user')
      .doc(uid)
      .update({
        income: firebase.firestore.FieldValue.arrayUnion({
          ...newIncome
        })
      })

    dispatch(
      setIncome({
        income: [...income, { ...newIncome }]
      })
    )
  }

  const addNewInvestment = (investment: InvestmentObject) => {
    db.collection('user')
      .doc(uid)
      .update({
        investments: firebase.firestore.FieldValue.arrayUnion({
          ...investment
        })
      })

    dispatch(
      setInvestments({
        investments: [...investments, { ...investment }]
      })
    )
  }

  const addNewLiability = (liability: LiabilityObject) => {
    db.collection('user')
      .doc(uid)
      .update({
        liabilities: firebase.firestore.FieldValue.arrayUnion({
          ...liability
        })
      })

    dispatch(
      setLiabilities({
        liabilities: [...liabilities, { ...liability }]
      })
    )
  }

  const editLiabilityArray = (liabilityArray: Array<LiabilityObject>) => {
    db.collection('user').doc(uid).update({
      liabilities: liabilityArray
    })

    dispatch(setLiabilities({ liabilities: liabilityArray }))
  }

  const editIncomeArray = (incomeArray: Array<IncomeObject>) => {
    db.collection('user').doc(uid).update({
      income: incomeArray
    })

    dispatch(setIncome({ income: incomeArray }))
  }

  const editIncomeArrayNoDB = (incomeArray: Array<IncomeObject>) => {
    dispatch(setIncome({ income: incomeArray }))
  }

  const addNewExpense = (expense: ExpenseObject) => {
    db.collection('user')
      .doc(uid)
      .update({
        expenses: firebase.firestore.FieldValue.arrayUnion({
          ...expense
        })
      })

    dispatch(
      setExpenses({
        expenses: [...expenses, { ...expense }]
      })
    )
  }

  const editExpenseArray = (expensesArray: Array<ExpenseObject>) => {
    db.collection('user').doc(uid).update({
      expenses: expensesArray
    })
    dispatch(setExpenses({ expenses: expensesArray }))
  }

  const editExpenseArrayNoDB = (expensesArray: Array<ExpenseObject>) => {
    dispatch(setExpenses({ expenses: expensesArray }))
  }

  const editInvestmentArray = (investmentsArray: Array<InvestmentObject>) => {
    db.collection('user').doc(uid).update({
      investments: investmentsArray
    })

    dispatch(setInvestments({ investments: investmentsArray }))
  }

  const editInvestmentArrayNoDB = (investmentsArray: Array<InvestmentObject>) => {
    dispatch(setInvestments({ investments: investmentsArray }))
  }

  const getNetWorthTable = () => {
    const worthTable: Array<any> = []
    const annotations: Array<any> = []
    let newInvestments = 0
    const finalYear = thisYear + timeframe + 2

    // Get highest investment pct
    let highestInvestmentPct = 0.01
    for (let k = 0; k < investments.length; k++) {
      if (investments[k].growth > highestInvestmentPct) highestInvestmentPct = investments[k].growth
    }

    for (let i = thisYear + 1; i < finalYear; i++) {
      const thisYearAnnotations: Array<any> = []

      // Calculate Total Income
      let totalIncome = 0

      for (let j = 0; j < income.length; j++) {
        const thisIncome = income[j]
        let incomeStartDate = thisYear
        let incomeEndDate = finalYear
        if (thisIncome.startDate && thisIncome.startDate !== '') incomeStartDate = parseInt(thisIncome.startDate)
        if (thisIncome.endDate && thisIncome.endDate !== '') incomeEndDate = parseInt(thisIncome.endDate)
        if (i >= incomeStartDate && i < incomeEndDate) {
          totalIncome += thisIncome.amount * 12 * Math.pow(1 + thisIncome.growth, i - incomeStartDate)
        }
      }

      // Calculate Total Expenses
      let totalExpenses = 0
      for (let j = 0; j < expenses.length; j++) {
        const thisExpense = expenses[j]
        let startDate = thisYear
        let endDate = finalYear
        if (thisExpense.startDate && thisExpense.startDate !== '') startDate = parseInt(thisExpense.startDate)
        if (thisExpense.endDate && thisExpense.endDate !== '') endDate = parseInt(thisExpense.endDate)

        if (i >= startDate && i < endDate) {
          totalExpenses += thisExpense.amount * 12 * Math.pow(1 + thisExpense.growth, i - startDate)
        }
      }

      // Calculate Total Investments
      const newInvestment = totalIncome - totalExpenses
      newInvestments += newInvestment

      newInvestments += highestInvestmentPct * newInvestment

      let totalInvestment = newInvestments
      for (let k = 0; k < investments.length; k++) {
        const thisInvestment = investments[k]
        totalInvestment +=
          thisInvestment.amount *
          Math.pow(1 + (thisInvestment.growth - (thisInvestment.fee ? thisInvestment.fee : 0)), i - thisYear)
      }

      // Calculate Total Liabilities
      let totalLiabilities = 0
      for (let j = 0; j < liabilities.length; j++) {
        const thisLiability = liabilities[j]
        let startDate = thisYear
        let endDate = finalYear
        if (thisLiability.startDate && thisLiability.startDate !== '') startDate = parseInt(thisLiability.startDate)
        if (thisLiability.endDate && thisLiability.endDate !== '') endDate = parseInt(thisLiability.endDate)

        if (i >= startDate && i < endDate) {
          if (thisLiability.interestOnly) totalLiabilities += thisLiability.amount
          else {
            const pmt = -PMT(
              thisLiability.interestRate / 12,
              (thisLiability.endDate - thisLiability.startDate) * 12,
              thisLiability.amount,
              0,
              0
            )

            const yearsLeft = thisLiability.endDate - i
            const presentValue =
              (pmt * (1 - Math.pow(1 + thisLiability.interestRate / 12, -(yearsLeft * 12)))) /
              (thisLiability.interestRate / 12)
            totalLiabilities += presentValue
          }
        }
      }

      worthTable.push({
        year: i,
        age: age + (i - thisYear),
        assets: totalInvestment,
        liabilities: totalLiabilities,
        networth: totalInvestment - totalLiabilities,
        annotations: thisYearAnnotations
      })

      thisYearAnnotations.map((annotation: any) => {
        annotations.push(annotation)
        return null
      })
    }

    return [worthTable, annotations]
  }

  const getCalcTable = () => {
    const calcTable: Array<any> = []
    const annotations: Array<any> = []
    // const monthlyExpenses = calculateMonthlyExpenses()
    let newInvestments = 0
    const finalYear = thisYear + timeframe + 2

    // Get highest investment pct
    let highestInvestmentPct = 0.01
    for (let k = 0; k < investments.length; k++) {
      if (investments[k].growth > highestInvestmentPct) highestInvestmentPct = investments[k].growth
    }

    for (let i = thisYear + 1; i < finalYear; i++) {
      const thisYearAnnotations: Array<any> = []
      // Calculate Total Income
      let totalIncome = 0

      for (let j = 0; j < income.length; j++) {
        const thisIncome = income[j]
        let incomeStartDate = thisYear
        let incomeEndDate = finalYear
        if (thisIncome.startDate && thisIncome.startDate !== '') incomeStartDate = parseInt(thisIncome.startDate)
        if (thisIncome.endDate && thisIncome.endDate !== '') incomeEndDate = parseInt(thisIncome.endDate)
        if (i >= incomeStartDate && i < incomeEndDate) {
          totalIncome += thisIncome.amount * 12 * Math.pow(1 + thisIncome.growth, i - incomeStartDate)
        }
        // Add annotation
        if (i === incomeStartDate) {
          thisYearAnnotations.push({
            x: i,
            type: 'incomeStart',
            label: thisIncome.name + ' - Income Start'
          })
        }
        if (i === incomeEndDate) {
          thisYearAnnotations.push({
            x: i,
            type: 'incomeEnd',
            label: thisIncome.name + ' - Income End'
          })
        }
      }

      // Calculate Total Expenses
      let totalExpenses = 0
      for (let j = 0; j < expenses.length; j++) {
        const thisExpense = expenses[j]
        let startDate = thisYear
        let endDate = finalYear
        if (thisExpense.startDate && thisExpense.startDate !== '') startDate = parseInt(thisExpense.startDate)
        if (thisExpense.endDate && thisExpense.endDate !== '') endDate = parseInt(thisExpense.endDate)

        if (i >= startDate && i < endDate) {
          totalExpenses += thisExpense.amount * 12 * Math.pow(1 + thisExpense.growth, i - startDate)
        }

        // Add annotation
        if (i === startDate) {
          thisYearAnnotations.push({
            x: i,
            type: 'expenseStart',
            label: thisExpense.name + ' - Expense Start'
          })
        }
        if (i === endDate) {
          thisYearAnnotations.push({
            x: i,
            type: 'expenseEnd',
            label: thisExpense.name + ' - Expense End'
          })
        }
      }

      // Calculate Total Investments
      let investmentsReturn = 0
      const newInvestment = totalIncome - totalExpenses
      newInvestments += newInvestment
      investmentsReturn += highestInvestmentPct * newInvestments
      newInvestments += highestInvestmentPct * newInvestment

      let totalInvestment = newInvestments
      for (let k = 0; k < investments.length; k++) {
        const thisInvestment = investments[k]
        let startDate = thisYear
        if (thisInvestment.startDate && thisInvestment.startDate !== '') startDate = parseInt(thisInvestment.startDate)

        if (i >= startDate) {
          const existingInvestmentReturn =
            thisInvestment.amount *
            Math.pow(1 + (thisInvestment.growth - (thisInvestment.fee ? thisInvestment.fee : 0)), i - thisYear - 1) *
            (thisInvestment.growth - (thisInvestment.fee ? thisInvestment.fee : 0))
          investmentsReturn += existingInvestmentReturn
          totalInvestment +=
            thisInvestment.amount *
            Math.pow(1 + (thisInvestment.growth - (thisInvestment.fee ? thisInvestment.fee : 0)), i - thisYear)
        }

        // Add annotation
        if (i === startDate) {
          thisYearAnnotations.push({
            x: i,
            type: 'investmentStart',
            label: thisInvestment.name + ' - Asset Received'
          })
        }
      }

      calcTable.push({
        year: i,
        age: age + (i - thisYear),
        income: totalIncome,
        expenses: totalExpenses,
        savingsRate: (totalIncome - totalExpenses) / totalIncome,
        drawdown: Math.max(0, investmentsReturn) / totalInvestment,
        investment: totalInvestment,
        investmentReturn: Math.max(0, investmentsReturn),
        averageInvestmentReturn: investmentsReturn / totalInvestment,
        financialIndependence: investmentsReturn > totalExpenses ? 'Yes' : 'No',
        annotations: thisYearAnnotations
      })

      thisYearAnnotations.map((annotation: any) => {
        annotations.push(annotation)
        return null
      })
    }

    return [calcTable, annotations]
  }

  return {
    getDetails,
    removeScenarios,
    getCalcTable,
    getNetWorthTable,
    monthlyExpenses: calculateTotalMonthlyExpense(expenses),
    emergencyFund: calculateEmergencyFund(investments),
    monthlyIncome: calculateTotalMonthlyIncome(income),
    totalInvestments: calculateTotalInvestments(investments),
    totalAssets: calculateTotalAssets(investments),
    totalLiabilities: calculateTotalLiabilities(liabilities),
    calculateTotalMonthlyExpense,
    calculateEmergencyFund,
    calculateTotalMonthlyIncome,
    calculateTotalInvestments,
    thisYear,
    age,
    loading,
    timeframe,
    currency,
    wageGrowth,
    communityOptOut,
    expenses,
    income,
    investments,
    liabilities,
    addNewExpense,
    editExpenseArray,
    editExpenseArrayNoDB,
    addNewIncome,
    editIncomeArray,
    editIncomeArrayNoDB,
    addNewLiability,
    editLiabilityArray,
    addNewInvestment,
    editInvestmentArray,
    editInvestmentArrayNoDB,
    setCurrency: _setCurrency,
    setAge: _setAge,
    setTimeframe: _setTimeframe,
    setCommunityOptOut: _setCommunityOptOut,
    endDate: 2100
  }
}
