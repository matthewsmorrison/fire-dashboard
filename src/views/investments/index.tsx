import React, { useState } from 'react'
import { DashboardContainer, TitleRow, StatsRow, DashboardContent } from 'style'
import { useApplicationStore } from 'hooks/application'
import { IncomeRow } from 'views/income/style'
import Tooltip from '@material-ui/core/Tooltip'
import { formatNumber, formatPercentage } from 'helpers/utils'
import { icon } from 'assets'
import { CURRENCY_CODES } from 'helpers/const'
import FinancialBox from 'components/financialBox'
import FinanceCard from 'components/financeCard'
import { InvestmentObject } from 'types'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import MobileMenu from 'components/mobileMenu'

const Investments: React.FC = () => {
  const {
    thisYear,
    totalAssets,
    currency,
    investments,
    age,
    addNewInvestment,
    editInvestmentArray,
    loading
  } = useApplicationStore()

  const defaultInvestment: InvestmentObject = {
    open: false,
    url: '',
    name: 'My Savings',
    growth: 0.03,
    fee: 0,
    emergencyFund: false,
    amount: 0,
    startDate: thisYear,
    arrayPosition: -1
  }

  const [addInvestment, setAddInvestment] = useState<InvestmentObject>(defaultInvestment)
  const [editInvestment, setEditInvestment] = useState<InvestmentObject>(defaultInvestment)

  const saveNewInvestment = () => {
    addNewInvestment(addInvestment)
    setAddInvestment(defaultInvestment)
  }

  const saveEditInvestment = () => {
    const newInvestmentArray = [...investments]
    newInvestmentArray[editInvestment.arrayPosition] = {
      name: editInvestment.name,
      amount: editInvestment.amount,
      url: editInvestment.url,
      growth: editInvestment.growth,
      fee: editInvestment.fee,
      emergencyFund: editInvestment.emergencyFund,
      startDate: editInvestment.startDate
    }

    editInvestmentArray(newInvestmentArray)
    setEditInvestment({ ...editInvestment, open: false })
  }

  const deleteInvestment = (number: number) => {
    const newInvestmentArray = [...investments]
    newInvestmentArray.splice(number, 1)
    editInvestmentArray(newInvestmentArray)
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        <div>Assets</div>
        <div
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => setAddInvestment({ ...addInvestment, open: true })}
        >
          <Tooltip style={{ userSelect: 'none' }} title="Add New Asset">
            <img src={icon.add} style={{ width: '50px', height: '50px' }} alt="add assrt" />
          </Tooltip>
        </div>
      </TitleRow>

      <StatsRow>{`You currently have ${CURRENCY_CODES[currency].symbol}${formatNumber(
        totalAssets
      )} in assets.`}</StatsRow>

      <DashboardContent>
        <IncomeRow>
          {investments.map((investment: InvestmentObject, investmentNumber: number) => {
            return (
              <FinanceCard
                key={investmentNumber}
                name={investment.name}
                url={investment.url ? investment.url : ''}
                iconType={'piggy'}
                // loading={loading}
                editClick={() => {
                  setEditInvestment({
                    open: true,
                    name: investment.name,
                    url: investment.url ? investment.url : '',
                    amount: investment.amount,
                    growth: investment.growth,
                    fee: investment.fee ? investment.fee : 0,
                    arrayPosition: investmentNumber,
                    emergencyFund: investment.emergencyFund,
                    startDate: investment.startDate ? investment.startDate : thisYear
                  })
                }}
                deleteClick={() => {
                  deleteInvestment(investmentNumber)
                }}
                content={`This asset is worth ${CURRENCY_CODES[currency].symbol}${formatNumber(
                  investment.amount ? investment.amount : 0
                )} (with a return of ${formatPercentage(investment.growth).toFixed(2)}% per year).`}
              />
            )
          })}
        </IncomeRow>
      </DashboardContent>

      <FinancialBox
        title={'Add New Asset'}
        open={addInvestment.open}
        label={'New Asset Name'}
        helperText={
          'This could be a savings account, house equity or an investment account (e.g. invesments in stocks).'
        }
        urlText={'Enter the URL for this asset (could be a link to your S&S ISA, investment account etc.).'}
        handleClose={() => setAddInvestment({ ...addInvestment, open: false })}
        handleSave={() => saveNewInvestment()}
        amountComment={'Please enter the current balance of this asset.'}
        growthComment={
          'Please enter how much you expect this asset to grow per year (if it is a savings account then it will most likely be around 1%, if it is a stock investment account you can set this to around 7%).'
        }
        yearComment={
          'Please enter the year that you expect to receive this asset (could be a pension that you receive at the age of around 65 or an expected inheritance). Leave blank if you currently hold this asset.'
        }
        onYearStartChange={(event) =>
          setAddInvestment({
            ...addInvestment,
            startDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearStartHelperComment={`Age: ${addInvestment.startDate - thisYear + age}. Expected value: ${
          CURRENCY_CODES[currency].symbol
        }${formatNumber(
          Math.round(
            addInvestment.amount *
              Math.pow(
                1 + (addInvestment.growth - (addInvestment.fee ? addInvestment.fee : 0)),
                addInvestment.startDate - thisYear
              )
          )
        )}`}
        onNameChange={(event) => setAddInvestment({ ...addInvestment, name: event.target.value })}
        onUrlChange={(event) => setAddInvestment({ ...addInvestment, url: event.target.value })}
        onGrowthChange={(value) => setAddInvestment({ ...addInvestment, growth: value })}
        onFeeChange={(value) => setAddInvestment({ ...addInvestment, fee: value })}
        onAmountChange={(event) => setAddInvestment({ ...addInvestment, amount: parseInt(event.target.value) })}
        onCheckboxChange={(event) => setAddInvestment({ ...addInvestment, emergencyFund: event.target.checked })}
        checkboxLabel={'This is an emergency fund'}
        data={addInvestment}
      />

      <FinancialBox
        title={'Edit Asset'}
        open={editInvestment.open}
        label={'Asset Name'}
        helperText={
          'This could be a savings account, house equity, or an investment account (e.g. invesments in stocks).'
        }
        urlText={'Enter the URL for this asset (could be a link to your S&S ISA, investment account etc.).'}
        handleClose={() => setEditInvestment({ ...editInvestment, open: false })}
        handleSave={() => saveEditInvestment()}
        amountComment={'Please enter the current balance of this asset. '}
        growthComment={
          'Please enter how much you expect this asset to grow per year (if it is a savings account then it will most likely be around 1%, if it is a stock investment account you can set this to around 7%).'
        }
        yearComment={
          'Please enter the year that you expect to receive this asset (could be a pension that you receive at the age of around 65 or an expected inheritance). Leave blank if you currently hold this asset.'
        }
        onYearStartChange={(event) =>
          setEditInvestment({
            ...editInvestment,
            startDate: event.target.value ? parseInt(event.target.value) : thisYear
          })
        }
        onYearStartHelperComment={`Age: ${editInvestment.startDate - thisYear + age}. Expected value: ${
          CURRENCY_CODES[currency].symbol
        }${formatNumber(
          Math.round(
            editInvestment.amount *
              Math.pow(
                1 + (editInvestment.growth - (editInvestment.fee ? editInvestment.fee : 0)),
                editInvestment.startDate - thisYear
              )
          )
        )}`}
        onNameChange={(event) => setEditInvestment({ ...editInvestment, name: event.target.value })}
        onUrlChange={(event) => setEditInvestment({ ...editInvestment, url: event.target.value })}
        onGrowthChange={(value) => setEditInvestment({ ...editInvestment, growth: value })}
        onFeeChange={(value) => setEditInvestment({ ...editInvestment, fee: value })}
        onAmountChange={(event) => setEditInvestment({ ...editInvestment, amount: parseInt(event.target.value) })}
        onCheckboxChange={(event) => setEditInvestment({ ...editInvestment, emergencyFund: event.target.checked })}
        checkboxLabel={'This is an emergency fund'}
        data={editInvestment}
      />
      <Backdrop style={{ zIndex: 100, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardContainer>
  )
}

export default Investments
