import React, { useState, useEffect } from 'react'
import { DashboardContainer, TitleRow, StatsRow, DashboardContent } from 'style'
import { useApplicationStore } from 'hooks/application'
import { CURRENCY_CODES } from 'helpers/const'
import { IncomeRow } from 'views/income/style'
import Tooltip from '@material-ui/core/Tooltip'
import { formatNumber } from 'helpers/utils'
import { icon } from 'assets'
import FinancialBox from 'components/financialBox'
import FinanceCard from 'components/financeCard'
import { ExpenseObject } from 'types'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import MobileMenu from 'components/mobileMenu'

const Expenses: React.FC = () => {
  const {
    thisYear,
    monthlyExpenses,
    currency,
    expenses,
    addNewExpense,
    editExpenseArray,
    endDate,
    age,
    loading,
    removeScenarios
  } = useApplicationStore()

  const defaultExpense: ExpenseObject = {
    open: false,
    url: '',
    name: 'Rent/Mortgage',
    growth: 0.03,
    startDate: thisYear,
    endDate: endDate,
    amount: 0,
    arrayPosition: -1
  }

  useEffect(() => {
    removeScenarios()
  }, [])

  const [addExpense, setAddExpense] = useState<ExpenseObject>(defaultExpense)
  const [editExpense, setEditExpense] = useState<ExpenseObject>(defaultExpense)

  const saveNewExpense = () => {
    addNewExpense(addExpense)
    setAddExpense(defaultExpense)
  }

  const saveEditExpense = () => {
    const newExpensesArray = [...expenses]
    newExpensesArray[editExpense.arrayPosition] = {
      name: editExpense.name,
      url: editExpense.url,
      amount: editExpense.amount,
      growth: editExpense.growth,
      startDate: editExpense.startDate,
      endDate: editExpense.endDate
    }

    editExpenseArray(newExpensesArray)
    setEditExpense({ ...editExpense, open: false })
  }

  const deleteExpense = (number: number) => {
    const newExpensesArray = [...expenses]
    newExpensesArray.splice(number, 1)
    editExpenseArray(newExpensesArray)
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        <div>Expenses</div>
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => setAddExpense({ ...addExpense, open: true })}
        >
          <Tooltip style={{ userSelect: 'none' }} title="Add New Expense">
            <img src={icon.add} style={{ width: '50px', height: '50px' }} alt="add expense" />
          </Tooltip>
        </div>
      </TitleRow>

      <StatsRow>{`You currently spend ${CURRENCY_CODES[currency].symbol}${formatNumber(
        monthlyExpenses
      )} per month (equivalent to ${CURRENCY_CODES[currency].symbol}${formatNumber(
        monthlyExpenses * 12
      )} per year) on your expenses.`}</StatsRow>

      <DashboardContent>
        <IncomeRow>
          {expenses.map((expense: ExpenseObject, expenseNumber: number) => {
            return (
              <FinanceCard
                key={expenseNumber}
                iconType={'cost'}
                url={expense.url ? expense.url : ''}
                name={expense.name}
                editClick={() => {
                  setEditExpense({
                    open: true,
                    url: expense.url ? expense.url : '',
                    name: expense.name,
                    amount: expense.amount,
                    growth: expense.growth,
                    startDate: expense.startDate ? expense.startDate : thisYear,
                    endDate: expense.endDate ? expense.endDate : endDate,
                    arrayPosition: expenseNumber
                  })
                }}
                deleteClick={() => {
                  deleteExpense(expenseNumber)
                }}
                content={`This expense costs ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  expense.amount ? expense.amount : 0
                )} per month (equivalent to ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  (expense.amount ? expense.amount : 0) * 12
                )} per year).`}
              />
            )
          })}
        </IncomeRow>
      </DashboardContent>

      <FinancialBox
        title={'Add New Expense'}
        open={addExpense.open}
        label={'New Expense Name'}
        helperText={'This could be your mortgage, rent or another ongoing monthly expense.'}
        urlText={'Enter the URL for this expense (could be a link to your energy provider, council tax rates etc.).'}
        handleClose={() => setAddExpense({ ...addExpense, open: false })}
        handleSave={() => saveNewExpense()}
        amountComment={'Please enter how much this expense costs you per month.'}
        growthComment={
          'Please enter how much you expect this expense to grow per year (if you do not know then 3% is good figure to use).'
        }
        yearComment={'Please enter the start and end date of this expense. If it is ongoing then leave both blank.'}
        onYearStartChange={(event) =>
          setAddExpense({ ...addExpense, startDate: event.target.value ? parseInt(event.target.value) : thisYear })
        }
        onYearEndChange={(event) =>
          setAddExpense({ ...addExpense, endDate: event.target.value ? parseInt(event.target.value) : endDate })
        }
        onYearStartHelperComment={`Age: ${addExpense.startDate - thisYear + age}`}
        onYearEndHelperComment={`Age: ${addExpense.endDate - thisYear + age}`}
        onNameChange={(event) => setAddExpense({ ...addExpense, name: event.target.value })}
        onUrlChange={(event) => setAddExpense({ ...addExpense, url: event.target.value })}
        onGrowthChange={(value) => setAddExpense({ ...addExpense, growth: value })}
        onAmountChange={(event) => setAddExpense({ ...addExpense, amount: parseInt(event.target.value) })}
        data={addExpense}
      />

      <FinancialBox
        title={'Edit Expense'}
        open={editExpense.open}
        label={'Expense Name'}
        helperText={'This could be your mortgage, rent or another ongoing monthly expense.'}
        urlText={'Enter the URL for this expense (could be a link to your energy provider, council tax rates etc.).'}
        handleClose={() => setEditExpense({ ...editExpense, open: false })}
        handleSave={() => saveEditExpense()}
        amountComment={'Please enter how much this expense costs you per month.'}
        growthComment={
          'Please enter how much you expect this expense to grow per year (if you do not know then 3% is good figure to use).'
        }
        yearComment={'Please enter the start and end date of this expense. If it is ongoing then leave both blank.'}
        onYearStartChange={(event) =>
          setEditExpense({ ...editExpense, startDate: event.target.value ? parseInt(event.target.value) : thisYear })
        }
        onYearEndChange={(event) =>
          setEditExpense({ ...editExpense, endDate: event.target.value ? parseInt(event.target.value) : endDate })
        }
        onYearStartHelperComment={`Age: ${editExpense.startDate - thisYear + age}`}
        onYearEndHelperComment={`Age: ${editExpense.endDate - thisYear + age}`}
        onNameChange={(event) => setEditExpense({ ...editExpense, name: event.target.value })}
        onUrlChange={(event) => setEditExpense({ ...editExpense, url: event.target.value })}
        onGrowthChange={(value) => setEditExpense({ ...editExpense, growth: value })}
        onAmountChange={(event) => setEditExpense({ ...editExpense, amount: parseInt(event.target.value) })}
        data={editExpense}
      />

      <Backdrop style={{ zIndex: 100, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardContainer>
  )
}

export default Expenses
