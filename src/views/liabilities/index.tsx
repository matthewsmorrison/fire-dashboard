import React, { useState } from 'react'
import { DashboardContainer, TitleRow, StatsRow, DashboardContent } from 'style'
import { useApplicationStore } from 'hooks/application'
import { IncomeRow } from 'views/income/style'
import Tooltip from '@material-ui/core/Tooltip'
import { formatNumber, formatPercentage, IPMT, PMT } from 'helpers/utils'
import { icon } from 'assets'
import { CURRENCY_CODES } from 'helpers/const'
import FinancialBox from 'components/financialBox'
import FinanceCard from 'components/financeCard'
import { LiabilityObject } from 'types'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import MobileMenu from 'components/mobileMenu'

const Liabilities: React.FC = () => {
  const {
    liabilities,
    loading,
    thisYear,
    currency,
    addNewLiability,
    editLiabilityArray,
    age,
    endDate,
    totalLiabilities
  } = useApplicationStore()

  const defaultLiability: LiabilityObject = {
    open: false,
    url: '',
    name: 'Debt',
    interestRate: 0.03,
    interestOnly: false,
    term: 30,
    amount: 0,
    startDate: thisYear,
    endDate: endDate,
    arrayPosition: -1
  }

  const [addLiability, setAddLiability] = useState<LiabilityObject>(defaultLiability)
  const [editLiability, setEditLiability] = useState<LiabilityObject>(defaultLiability)

  const saveNewLiability = () => {
    addNewLiability(addLiability)
    setAddLiability(defaultLiability)
  }

  const saveEditLiability = () => {
    const newLiabilityArray = [...liabilities]
    newLiabilityArray[editLiability.arrayPosition] = {
      name: editLiability.name,
      amount: editLiability.amount,
      url: editLiability.url,
      interestRate: editLiability.interestRate,
      interestOnly: editLiability.interestOnly,
      term: editLiability.term,
      startDate: editLiability.startDate,
      endDate: editLiability.endDate
    }

    editLiabilityArray(newLiabilityArray)
    setEditLiability({ ...editLiability, open: false })
  }

  const deleteLiability = (number: number) => {
    const newLiabilityArray = [...liabilities]
    newLiabilityArray.splice(number, 1)
    editLiabilityArray(newLiabilityArray)
  }

  const calculateMonthlyPayment = (amount: number, interest: number, term: number, interestOnly: boolean) => {
    // const monthlyInterest = interest / 100 / 12
    // const payments = term * 12
    // const x = Math.pow(1 + monthlyInterest, payments)
    // const monthly = (amount * x * monthlyInterest) / (x - 1)
    const pmt = PMT(interest / 12, term * 12, amount, 0, 0)
    if (interestOnly) return -IPMT(amount, pmt, interest / 12, 0).toFixed(0)
    else {
      return -pmt.toFixed(0)
    }
    // return -PMT(interest / 12, term * 12, amount, 0, 0).toFixed(0)
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        <div>Liabilities</div>
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => setAddLiability({ ...addLiability, open: true })}
        >
          <Tooltip style={{ userSelect: 'none' }} title="Add New Liability">
            <img src={icon.add} style={{ width: '50px', height: '50px' }} alt="add saving investment" />
          </Tooltip>
        </div>
      </TitleRow>

      <StatsRow>{`You currently have ${CURRENCY_CODES[currency].symbol}${formatNumber(
        totalLiabilities
      )} in liabilities.`}</StatsRow>

      <DashboardContent>
        {' '}
        <IncomeRow>
          {liabilities.map((liability: LiabilityObject, liabilityNumber: number) => {
            return (
              <FinanceCard
                key={liabilityNumber}
                name={liability.name}
                url={liability.url ? liability.url : ''}
                iconType={'debt'}
                editClick={() => {
                  setEditLiability({
                    open: true,
                    name: liability.name,
                    url: liability.url ? liability.url : '',
                    amount: liability.amount,
                    interestRate: liability.interestRate,
                    interestOnly: liability.interestOnly,
                    term: liability.term,
                    arrayPosition: liabilityNumber,
                    startDate: liability.startDate ? liability.startDate : thisYear,
                    endDate: liability.endDate ? liability.endDate : endDate
                  })
                }}
                deleteClick={() => {
                  deleteLiability(liabilityNumber)
                }}
                content={`This liability is valued at ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  liability.amount ? liability.amount : 0
                )} with an interest rate of ${formatPercentage(liability.interestRate).toFixed(2)}% per year.`}
              />
            )
          })}
        </IncomeRow>
      </DashboardContent>

      <FinancialBox
        title={'Add New Liability'}
        open={addLiability.open}
        label={'New Liability Name'}
        helperText={'This could be a mortgage on a property, student loan etc.'}
        urlText={
          'Enter the URL for this liability (could be a link to your mortgage account, student loans company etc.).'
        }
        handleClose={() => setAddLiability({ ...addLiability, open: false })}
        handleSave={() => saveNewLiability()}
        amountComment={'Please enter the current balance of this liability.'}
        yearComment={
          'Please enter the year that you expect to incur this liability (could be a liability related to a car purchase for example). Leave blank if you currently have this liablity.'
        }
        onYearStartChange={(event) =>
          setAddLiability({
            ...addLiability,
            startDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearEndChange={(event) =>
          setAddLiability({
            ...addLiability,
            endDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearStartHelperComment={`Age: ${addLiability.startDate - thisYear + age}.`}
        onYearEndHelperComment={`Age: ${addLiability.endDate - thisYear + age}. This liability has a ${
          addLiability.endDate - addLiability.startDate
        } year term.`}
        onNameChange={(event) => setAddLiability({ ...addLiability, name: event.target.value })}
        onUrlChange={(event) => setAddLiability({ ...addLiability, url: event.target.value })}
        onGrowthChange={(value) => setAddLiability({ ...addLiability, interestRate: value })}
        growthComment={`Please enter the annual interest rate (APR) for this this liability. At the current rate this is equivalent to a payment of ${
          CURRENCY_CODES[currency].symbol
        }${calculateMonthlyPayment(
          addLiability.amount,
          addLiability.interestRate,
          addLiability.endDate - addLiability.startDate,
          addLiability.interestOnly
        )} per month.`}
        onAmountChange={(event) => setAddLiability({ ...addLiability, amount: parseInt(event.target.value) })}
        onCheckboxChange={(event) => setAddLiability({ ...addLiability, interestOnly: event.target.checked })}
        checkboxLabel={'This is interest only'}
        data={addLiability}
      />

      <FinancialBox
        title={'Edit Liability'}
        open={editLiability.open}
        label={'Liability Name'}
        helperText={'This could be a mortgage on a property, student loan etc.'}
        urlText={
          'Enter the URL for this liability (could be a link to your mortgage account, student loans company etc.).'
        }
        handleClose={() => setEditLiability({ ...editLiability, open: false })}
        handleSave={() => saveEditLiability()}
        amountComment={'Please enter the current balance of this liability.'}
        yearComment={
          'Please enter the year that you expect to incur this liability (could be a liability related to a car purchase for example). Leave blank if you currently have this liablity.'
        }
        onYearStartChange={(event) =>
          setEditLiability({
            ...editLiability,
            startDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearEndChange={(event) =>
          setEditLiability({
            ...editLiability,
            endDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearStartHelperComment={`Age: ${editLiability.startDate - thisYear + age}.`}
        onYearEndHelperComment={`Age: ${editLiability.endDate - thisYear + age}. This liability has a ${
          editLiability.endDate - editLiability.startDate
        } year term.`}
        onNameChange={(event) => setEditLiability({ ...editLiability, name: event.target.value })}
        onUrlChange={(event) => setEditLiability({ ...editLiability, url: event.target.value })}
        onGrowthChange={(value) => setEditLiability({ ...editLiability, interestRate: value })}
        growthComment={`Please enter the annual interest rate (APR) for this this liability. At the current rate this is equivalent to a payment of ${
          CURRENCY_CODES[currency].symbol
        }${calculateMonthlyPayment(
          editLiability.amount,
          editLiability.interestRate,
          editLiability.endDate - editLiability.startDate,
          editLiability.interestOnly
        )} per month.`}
        onAmountChange={(event) => setEditLiability({ ...editLiability, amount: parseInt(event.target.value) })}
        onCheckboxChange={(event) => setEditLiability({ ...editLiability, interestOnly: event.target.checked })}
        checkboxLabel={'This is interest only'}
        data={editLiability}
      />

      <Backdrop style={{ zIndex: 100, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardContainer>
  )
}

export default Liabilities
