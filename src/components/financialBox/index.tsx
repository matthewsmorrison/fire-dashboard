import React from 'react'
import CustomDialog from 'components/dialog'
import { useApplicationStore } from 'hooks/application'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { CURRENCY_CODES } from 'helpers/const'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'

interface FinancialBoxProps {
  title: string
  open: boolean
  label: string
  checkboxLabel?: string
  helperText: string
  urlText: string
  handleClose: () => void
  handleSave: () => void
  onNameChange: (event) => void
  onUrlChange: (event) => void
  growthComment?: string
  yearComment?: string
  amountComment: string
  onGrowthChange?: (newValue) => void
  onFeeChange?: (newValue) => void
  onAmountChange: (event) => void
  onYearStartChange?: (event) => void
  onYearStartHelperComment?: string
  onYearEndHelperComment?: string
  onYearEndChange?: (event) => void
  onCheckboxChange?: (event) => void
  data: any
}

const FinancialBox: React.FC<FinancialBoxProps> = ({
  title,
  open,
  label,
  checkboxLabel,
  helperText,
  urlText,
  handleClose,
  handleSave,
  onNameChange,
  onUrlChange,
  growthComment,
  yearComment,
  amountComment,
  onGrowthChange,
  onFeeChange,
  onAmountChange,
  onYearStartChange,
  onYearStartHelperComment,
  onYearEndHelperComment,
  onYearEndChange,
  onCheckboxChange,
  data
}: FinancialBoxProps) => {
  const { currency } = useApplicationStore()

  return (
    <CustomDialog title={title} open={open} handleClose={handleClose} handleSave={handleSave}>
      <div style={{ padding: '20px' }}>
        <TextField
          id={`financial-box-${title}`}
          fullWidth
          style={{ marginBottom: '30px' }}
          label={label}
          helperText={helperText}
          variant="outlined"
          value={data.name}
          onChange={onNameChange}
        />
        <TextField
          id={`new-url`}
          fullWidth
          style={{ marginBottom: '30px' }}
          label={'URL'}
          helperText={urlText}
          variant="outlined"
          value={data.url}
          onChange={onUrlChange}
        />
        {checkboxLabel && (
          <FormControlLabel
            style={{ marginBottom: '30px', userSelect: 'none' }}
            control={
              <Checkbox
                checked={data.emergencyFund}
                onChange={onCheckboxChange}
                inputProps={{ 'aria-label': 'emergency fund checkbox' }}
              />
            }
            label={checkboxLabel}
          />
        )}

        <div>
          <p style={{ marginBottom: '30px' }}>{amountComment}</p>
          <TextField
            id="new-amount"
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">{CURRENCY_CODES[currency].symbol}</InputAdornment>
            }}
            type="number"
            value={data.amount ? data.amount : ''}
            onChange={onAmountChange}
          />
        </div>

        {growthComment && <p style={{ marginTop: '30px', marginBottom: '30px' }}>{growthComment}</p>}
        {onGrowthChange && (
          <Grid container spacing={2} alignItems="center" style={{ marginBottom: '30px' }}>
            <Grid item>
              <Input
                value={
                  data.growth
                    ? (data.growth * 100).toFixed(2)
                    : data.interestRate
                    ? (data.interestRate * 100).toFixed(2)
                    : 0
                }
                onChange={(event: React.ChangeEvent<any>) =>
                  onGrowthChange(event.target.value === '' ? '' : Number(event.target.value) / 100)
                }
                style={{ userSelect: 'none' }}
                type="number"
                inputProps={{
                  step: 0.1,
                  min: 0,
                  max: 100,
                  type: 'number'
                }}
              />
            </Grid>
            <Grid item>%</Grid>
          </Grid>
        )}
        {onFeeChange && (
          <div>
            <p style={{ marginTop: '30px', marginBottom: '30px' }}>
              Please enter the yearly percentage fee that this saving/investment charges (e.g. 0.2% on a typical
              Vanguard fund)
            </p>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '30px' }}>
              <Grid item>
                <Input
                  value={data.fee ? (data.fee * 100).toFixed(2) : 0}
                  onChange={(event: React.ChangeEvent<any>) =>
                    onFeeChange(event.target.value === '' ? '' : Number(event.target.value) / 100)
                  }
                  style={{ userSelect: 'none' }}
                  type="number"
                  inputProps={{
                    step: 0.01,
                    min: 0,
                    max: 10,
                    type: 'number'
                  }}
                />
              </Grid>
              <Grid item>%</Grid>
            </Grid>
          </div>
        )}
        {yearComment && (
          <div>
            <p style={{ marginTop: '30px', marginBottom: '30px' }}>{yearComment}</p>
            {onYearStartChange && (
              <TextField
                id="income-start-year"
                style={{ marginBottom: '20px' }}
                fullWidth
                label={'Start Year'}
                InputProps={{
                  inputProps: {
                    step: 1
                  }
                }}
                type="number"
                helperText={onYearStartHelperComment ? onYearStartHelperComment : ''}
                value={data.startDate ? data.startDate : ''}
                onChange={onYearStartChange}
              />
            )}
            {onYearEndChange && (
              <TextField
                id="income-end-year"
                fullWidth
                label={'End Year'}
                InputProps={{
                  inputProps: {
                    step: 1
                  }
                }}
                type="number"
                helperText={onYearEndHelperComment ? onYearEndHelperComment : ''}
                value={data.endDate ? data.endDate : ''}
                onChange={onYearEndChange}
              />
            )}
          </div>
        )}
      </div>
    </CustomDialog>
  )
}

export default FinancialBox
