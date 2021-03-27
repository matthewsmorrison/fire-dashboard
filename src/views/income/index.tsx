import React, { useState, useEffect } from 'react'
import { DashboardContainer, TitleRow, StatsRow, DashboardContent } from 'style'
import { useApplicationStore } from 'hooks/application'
import { IncomeRow } from 'views/income/style'
import Tooltip from '@material-ui/core/Tooltip'
import { formatNumber } from 'helpers/utils'
import { icon } from 'assets'
import { CURRENCY_CODES } from 'helpers/const'
import FinancialBox from 'components/financialBox'
import FinanceCard from 'components/financeCard'
import { IncomeObject } from 'types'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import MobileMenu from 'components/mobileMenu'

const Income: React.FC = () => {
  const {
    monthlyIncome,
    currency,
    income,
    addNewIncome,
    editIncomeArray,
    thisYear,
    endDate,
    age,
    loading,
    removeScenarios
  } = useApplicationStore()

  const incomeDefault: IncomeObject = {
    open: false,
    url: '',
    name: 'My Salary',
    growth: 0.03,
    startDate: thisYear,
    endDate: endDate,
    amount: 0,
    arrayPosition: -1
  }

  useEffect(() => {
    removeScenarios()
    // eslint-disable-next-line
  }, [])

  const [addIncome, setAddIncome] = useState<IncomeObject>(incomeDefault)
  const [editIncome, setEditIncome] = useState<IncomeObject>(incomeDefault)

  const saveNewIncome = () => {
    addNewIncome(addIncome)
    setAddIncome(incomeDefault)
  }
  const saveEditIncome = () => {
    const newIncomeArray = [...income]
    newIncomeArray[editIncome.arrayPosition] = {
      name: editIncome.name,
      amount: editIncome.amount,
      url: editIncome.url,
      growth: editIncome.growth,
      startDate: editIncome.startDate,
      endDate: editIncome.endDate
    }

    editIncomeArray(newIncomeArray)
    setEditIncome({ ...editIncome, open: false })
  }

  const deleteIncome = (number: number) => {
    const newIncomeArray = [...income]
    newIncomeArray.splice(number, 1)
    editIncomeArray(newIncomeArray)
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        <div>Income</div>
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => setAddIncome({ ...addIncome, open: true })}
        >
          <Tooltip style={{ userSelect: 'none' }} title="Add New Income Source">
            <img src={icon.add} style={{ width: '50px', height: '50px' }} alt="add income source" />
          </Tooltip>
        </div>
      </TitleRow>

      <StatsRow>{`You currently make ${CURRENCY_CODES[currency].symbol}${formatNumber(
        monthlyIncome
      )} per month (equivalent to ${CURRENCY_CODES[currency].symbol}${formatNumber(
        monthlyIncome * 12
      )} per year) from your income sources.`}</StatsRow>

      <DashboardContent>
        <IncomeRow>
          {income.map((incomeSource: IncomeObject, incomeNumber: number) => {
            return (
              <FinanceCard
                key={incomeNumber}
                iconType={'money'}
                name={incomeSource.name}
                url={incomeSource.url ? incomeSource.url : ''}
                editClick={() => {
                  setEditIncome({
                    open: true,
                    url: incomeSource.url ? incomeSource.url : '',
                    name: incomeSource.name,
                    amount: incomeSource.amount,
                    growth: incomeSource.growth,
                    startDate: incomeSource.startDate ? incomeSource.startDate : thisYear,
                    endDate: incomeSource.endDate ? incomeSource.endDate : endDate,
                    arrayPosition: incomeNumber
                  })
                }}
                deleteClick={() => {
                  deleteIncome(incomeNumber)
                }}
                content={`This income source generates ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  incomeSource.amount ? incomeSource.amount : 0
                )} in post-tax income per month (equivalent to ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  (incomeSource.amount ? incomeSource.amount : 0) * 12
                )} per year).`}
              />
            )
          })}
        </IncomeRow>
      </DashboardContent>

      <FinancialBox
        title={'Add New Income Source'}
        open={addIncome.open}
        label={'New Income Source Name'}
        helperText={"This could be your primary income, your partner's primary income or a side income stream."}
        urlText={
          'Enter the URL for this income (could be a link to your payslips, secondary income source dashboard etc.).'
        }
        handleClose={() => setAddIncome({ ...addIncome, open: false })}
        handleSave={() => saveNewIncome()}
        amountComment={
          'Please enter your post-tax income per month. This should be the actual amount received in your bank account within each month.'
        }
        growthComment={
          'Please enter how much you expect this income source to grow per year (if you do not know then 3% is good figure to use).'
        }
        yearComment={
          'Please enter the start and end date of this income source. If it is ongoing then leave both blank.'
        }
        onYearStartChange={(event) =>
          setAddIncome({ ...addIncome, startDate: event.target.value ? parseInt(event.target.value) : thisYear })
        }
        onYearStartHelperComment={`Age: ${addIncome.startDate - thisYear + age}`}
        onYearEndHelperComment={`Age: ${addIncome.endDate - thisYear + age}`}
        onYearEndChange={(event) =>
          setAddIncome({ ...addIncome, endDate: event.target.value ? parseInt(event.target.value) : endDate })
        }
        onNameChange={(event) => setAddIncome({ ...addIncome, name: event.target.value })}
        onUrlChange={(event) => setAddIncome({ ...addIncome, url: event.target.value })}
        onGrowthChange={(value) => setAddIncome({ ...addIncome, growth: value })}
        onAmountChange={(event) => setAddIncome({ ...addIncome, amount: parseInt(event.target.value) })}
        data={addIncome}
      />

      <FinancialBox
        title={'Edit Income Source'}
        open={editIncome.open}
        label={'Income Source Name'}
        helperText={"This could be your primary income, your partner's primary income or a side income stream."}
        urlText={
          'Enter the URL for this income (could be a link to your payslips, secondary income source dashboard etc.).'
        }
        handleClose={() => setEditIncome({ ...editIncome, open: false })}
        handleSave={() => saveEditIncome()}
        amountComment={
          'Please enter your post-tax income per month. This should be the actual amount received in your bank account within each month.'
        }
        growthComment={
          'Please enter how much you expect this income source to grow per year (if you do not know then 3% is good figure to use).'
        }
        yearComment={
          'Please enter the start and end date of this income source. If it is ongoing then leave both blank.'
        }
        onYearStartChange={(event) =>
          setEditIncome({ ...editIncome, startDate: event.target.value ? parseInt(event.target.value) : thisYear })
        }
        onYearStartHelperComment={`Age: ${editIncome.startDate - thisYear + age}`}
        onYearEndHelperComment={`Age: ${editIncome.endDate - thisYear + age}`}
        onYearEndChange={(event) =>
          setEditIncome({ ...editIncome, endDate: event.target.value ? parseInt(event.target.value) : endDate })
        }
        onNameChange={(event) => setEditIncome({ ...editIncome, name: event.target.value })}
        onUrlChange={(event) => setEditIncome({ ...editIncome, url: event.target.value })}
        onGrowthChange={(value) => setEditIncome({ ...editIncome, growth: value })}
        onAmountChange={(event) => setEditIncome({ ...editIncome, amount: parseInt(event.target.value) })}
        data={editIncome}
      />
      <Backdrop style={{ zIndex: 100, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardContainer>
  )
}

export default Income
