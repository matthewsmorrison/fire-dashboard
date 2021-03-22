import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardContainer, TitleRow, StatsRow } from 'style'
import { useApplicationStore } from 'hooks/application'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts'
import { CURRENCY_CODES } from 'helpers/const'
import {
  MetricsRow,
  MetricCard,
  FinancialIndependenceChart,
  MetricsCardTitle,
  MetricsCardContent,
  FinancialIndCardContent,
  FinancialIndCardTitle,
  FinancialIndependenceRow
} from 'views/dashboard/style'
import { icon } from 'assets'
import { formatNumber } from 'helpers/utils'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InfoIcon from '@material-ui/icons/Info'
import { Tooltip as MaterialTooltip } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MobileMenu from 'components/mobileMenu'

const Dashboard: React.FC = () => {
  const {
    emergencyFund,
    monthlyExpenses,
    monthlyIncome,
    getCalcTable,
    getNetWorthTable,
    setTimeframe,
    timeframe,
    investments,
    income,
    expenses,
    liabilities,
    currency,
    totalAssets,
    editIncomeArrayNoDB,
    editExpenseArrayNoDB,
    totalLiabilities,
    loading
  } = useApplicationStore()

  const calculations: any = getCalcTable()
  const netWorth: any = getNetWorthTable()
  const table: Array<any> = calculations[0]
  const annotations: Array<any> = calculations[1]
  const netWorthTable: Array<any> = netWorth[0]
  const netWorthAnnotations: Array<any> = netWorth[1]
  const [selectedChart, setSelectedChart] = useState<string>('worth')
  const [healthCheck, setHealthCheck] = useState<boolean>(false)

  const calculateFiYear = () => {
    for (let i = 0; i < table.length; i++) {
      if (table[i].financialIndependence === 'Yes') return i
    }

    return -1
  }

  const calculateDebtAboveThreshold = () => {
    let count = 0
    for (let k = 0; k < liabilities.length; k++) {
      if (liabilities[k].interestRate > 0.04) count += 1
    }

    return count
  }

  const calculateInvestmentFeeAboveThreshold = () => {
    let count = 0
    for (let k = 0; k < investments.length; k++) {
      if (investments[k].fee > 0.01) count += 1
    }

    return count
  }

  const emergencyFundCoverage = Math.round(emergencyFund / monthlyExpenses)
  const emergencyFundTest = emergencyFundCoverage >= 6
  const multipleIncomeTest = income.length > 1
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
  const savingsRateTest = savingsRate > 20
  // const debtCoverage = Math.round(totalLiabilitiesMonthly / totalIncome)
  const monthlyIncomeTest = monthlyIncome > monthlyExpenses
  const highInterestDebtTest = calculateDebtAboveThreshold() === 0
  const highInvestmentFeeTest = calculateInvestmentFeeAboveThreshold() === 0

  const testsFailing = () => {
    let testsFailing = 0

    if (!emergencyFundTest) testsFailing += 1
    if (!multipleIncomeTest) testsFailing += 1
    if (!savingsRateTest) testsFailing += 1
    if (!monthlyIncomeTest) testsFailing += 1
    if (!highInterestDebtTest) testsFailing += 1
    if (!highInvestmentFeeTest) testsFailing += 1

    return testsFailing
  }

  const fiYear = calculateFiYear()

  const CustomTooltip = (props: any) => {
    if (props.active) {
      return (
        <div
          style={{ background: 'white', padding: '10px', border: '1px solid rgb(204, 204, 204)', whiteSpace: 'nowrap' }}
        >
          <p
            style={{ fontWeight: 600, marginBottom: '5px' }}
          >{`${props.label} (Age ${props.payload[1].payload.age})`}</p>
          <p
            style={{ marginBottom: '5px', fontWeight: 500, color: props.payload[0].stroke }}
          >{`Yearly Savings/Investment Return: ${
            CURRENCY_CODES[currency].symbol
          }${props.payload[0].payload.savingsReturn.toFixed(0)}k`}</p>
          <p style={{ marginBottom: '5px', fontWeight: 500, color: props.payload[1].stroke }}>{`Yearly Expenses: ${
            CURRENCY_CODES[currency].symbol
          }${props.payload[1].payload.expenses.toFixed(0)}k (potential drawdown ${(
            (props.payload[1].payload.expenses / (props.payload[1].payload.investment / 1000)) *
            100
          ).toFixed(0)}%
          )`}</p>
          {props.payload[0].payload.annotations.map((annotation: any, annotationNumber: number) => {
            return (
              <p key={annotationNumber} style={{ marginBottom: '5px' }}>
                {annotation.label}
              </p>
            )
          })}
        </div>
      )
    }

    return null
  }

  const CustomNetWorthTooltip = (props: any) => {
    if (props.active) {
      return (
        <div
          style={{ background: 'white', padding: '10px', border: '1px solid rgb(204, 204, 204)', whiteSpace: 'nowrap' }}
        >
          <p
            style={{ fontWeight: 600, marginBottom: '5px' }}
          >{`${props.label} (Age ${props.payload[1].payload.age})`}</p>

          <p style={{ marginBottom: '5px', fontWeight: 500, color: props.payload[1].stroke }}>{`Assets: ${
            CURRENCY_CODES[currency].symbol
          }${formatNumber(props.payload[0].payload.assets.toFixed(0))}k`}</p>
          <p style={{ marginBottom: '5px', fontWeight: 500, color: 'black' }}>{`Net Worth: ${
            CURRENCY_CODES[currency].symbol
          }${formatNumber(props.payload[0].payload.networth.toFixed(0))}k`}</p>
          <p style={{ marginBottom: '5px', fontWeight: 500, color: props.payload[0].stroke }}>{`Liabilities: ${
            CURRENCY_CODES[currency].symbol
          }${formatNumber(props.payload[0].payload.liabilities.toFixed(0))}k`}</p>

          {props.payload[0].payload.annotations.map((annotation: any, annotationNumber: number) => {
            return (
              <p key={annotationNumber} style={{ marginBottom: '5px' }}>
                {annotation.label}
              </p>
            )
          })}
        </div>
      )
    }

    return null
  }

  return (
    <DashboardContainer>
      <TitleRow>
        <MobileMenu />
        Dashboard
        <Badge
          color="secondary"
          badgeContent={testsFailing()}
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={(event: any) => setHealthCheck(true)}
        >
          <Typography
            style={{
              marginRight: '8px',
              background: '#321b3b',
              borderRadius: '4px',
              padding: '5px',
              fontWeight: 500,
              fontSize: '80%',
              color: 'white'
            }}
          >
            Your Financial Health
          </Typography>
        </Badge>
        <Dialog
          open={healthCheck}
          onClose={() => setHealthCheck(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', paddingRight: '24px' }}>
            <DialogTitle id="alert-dialog-title">{'Financial Health Check'} </DialogTitle>
            <CloseIcon onClick={() => setHealthCheck(false)} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              A series of standard checks for financial health can be found below. These should be taken as guidance
              rather than advice. Always consult a professional on these matters. A helpful starting point for financial
              health is the{' '}
              <a
                style={{ color: 'blue', textDecoration: 'underline' }}
                href="https://flowchart.ukpersonal.finance/"
                target="_blank"
                rel="noopener noreferrer"
              >
                UK Personal Finance flowchart
              </a>
              .
            </DialogContentText>

            <TableContainer component={Paper} style={{ marginTop: '20px', marginBottom: '20px' }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="center">Target</TableCell>
                    <TableCell align="center">Your Value</TableCell>
                    <TableCell align="center">Passing</TableCell>
                    <TableCell align="center">More Information</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Not Reliant on Credit
                    </TableCell>
                    <TableCell align="center">
                      Income > Expenses
                    </TableCell>

                      <TableCell align="center">
                        {monthlyIncome > monthlyExpenses
                          ? `${CURRENCY_CODES[currency].symbol}${monthlyIncome - monthlyExpenses} spare monthly income`
                          : `${CURRENCY_CODES[currency].symbol}${
                              monthlyExpenses - monthlyIncome
                            } excess monthly expenses`}
                      </TableCell>

                      <TableCell align="center">
                        {monthlyIncomeTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!monthlyIncomeTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>


                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            You should not be reliant on credit to fund your monthly expenses. This is not sustainable.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      High Interest Debt
                    </TableCell>
                    <TableCell align="center">{`No debt >4% p.a`}</TableCell>


                      <TableCell align="center">{calculateDebtAboveThreshold()} high interest debt(s)</TableCell>



                      <TableCell align="center">
                        {highInterestDebtTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!highInterestDebtTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>


                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            You should pay off any debt that has an interest rate of above 4% (possibly not student loan
                            depending on your country/situation). Debts usually cost more than savings earn and
                            therefore this should be prioritised above an emergency fund.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Emergency Fund
                    </TableCell>
                     <TableCell align="center">{`>6 months`}</TableCell>

                   <TableCell align="center">{emergencyFundCoverage} months</TableCell>


                      <TableCell align="center">
                        {emergencyFundTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!emergencyFundTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>


                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            Everyone should prepare for sudden expenses by regularly putting money aside (in easily
                            accessible accounts) for things like a broken washing machine or boiler. Ideally this could
                            cover 6-8 months of your montly expenses. However, there is also such a thing as too much
                            emergency savings as these will be not be achieving the highest rate of return.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      High Investment Fees
                    </TableCell>
                    <TableCell align="center">{`No investment fees >1% p.a`}</TableCell>


                      <TableCell align="center">
                        {calculateInvestmentFeeAboveThreshold()} high investment fee(s)
                      </TableCell>



                      <TableCell align="center">
                        {highInvestmentFeeTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!highInvestmentFeeTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>


                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            Low cost passive funds (ETFs, Mutual Funds etc) are usually the right choice for people with
                            long-term goals in mind (and sometimes outperform actively managed funds). Vanguard is a
                            popular choice with fund management fees as low as 0.22% p.a.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Savings Rate
                    </TableCell>
                    <TableCell align="center">{`>20%`}</TableCell>

                    <TableCell align="center">{savingsRate.toFixed(0) + '%'}</TableCell>

                      <TableCell align="center">
                        {savingsRateTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!savingsRateTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>

                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            As a savings rule of thumb, save a minimum of 20-25% of your post-tax income. A savings rate
                            of 50% or more should be targeted if you are looking at early financial
                            independence/retirement.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">
                      Multiple Income Streams
                    </TableCell>
                    <TableCell align="center">{`> 1 Income Stream`}</TableCell>

                    <TableCell align="center">{income.length} Income Stream(s)</TableCell>


                      <TableCell align="center">
                        {multipleIncomeTest && (
                          <img src={icon.tick} style={{ width: '30px', height: '30px' }} alt="tick" />
                        )}
                        {!multipleIncomeTest && (
                          <img src={icon.fail} style={{ width: '30px', height: '30px' }} alt="fail" />
                        )}
                      </TableCell>


                    <TableCell align="center">
                      <MaterialTooltip
                        title={
                          <span style={{ fontSize: '130%' }}>
                            Multiple income streams diversify your risk away from your primary salary. Extra income
                            streams could include your partner's salary, rental property income, side business revenue
                            etc.
                          </span>
                        }
                      >
                        <InfoIcon />
                      </MaterialTooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </TitleRow>

      <StatsRow><div>Welcome to your dashboard. Head over to your <Link to="/income" style={{ color: 'blue', textDecoration: 'underline' }}>income</Link> to add your current and future salary. Then add any <Link to="/expenses" style={{ color: 'blue', textDecoration: 'underline' }}>expenses</Link> (including inflation and expected future expenses...e.g. kids). Afterwards, add your <Link to="/assets" style={{ color: 'blue', textDecoration: 'underline' }}>assets</Link> (e.g. property) and <Link to="/liabilities" style={{ color: 'blue', textDecoration: 'underline' }}>liabilities (e.g. student loans or mortgages)</Link> to calculate net worth.</div></StatsRow>
      <MetricsRow>
        <MetricCard
          onClick={() => {
            setSelectedChart('worth')
            const element = document.getElementById('chart')
            if(element) {
              element.scrollIntoView()
            }
          }}
          selected={selectedChart === 'worth'}
          style={{ marginRight: '10px' }}
        >
          <MetricsCardTitle>
            <img src={icon.money} style={{ width: '40px', height: '40px' }} alt="net worth icon" />
            <div style={{ marginLeft: '15px' }}>
              Net Worth
              <span style={{ marginLeft: '7px', color: 'blue', textDecoration: 'underline' }}>(View Chart)</span>
            </div>
          </MetricsCardTitle>
          <MetricsCardContent>
            <div style={{ marginBottom: '10px' }}>
              Current Assets: {CURRENCY_CODES[currency].symbol}
              {Math.round(totalAssets)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Current Liabilities: {CURRENCY_CODES[currency].symbol}
              {Math.round(totalLiabilities)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Current Net Worth: {CURRENCY_CODES[currency].symbol}
              {Math.round(totalAssets - totalLiabilities)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          </MetricsCardContent>
        </MetricCard>
        <MetricCard
          onClick={() => {
            setSelectedChart('assets')
            const element = document.getElementById('chart')
            if(element) {
              element.scrollIntoView()
            }
          }}
          selected={selectedChart === 'assets'}
          style={{ marginRight: '10px' }}
        >
          <MetricsCardTitle>
            <img src={icon.piggy} style={{ width: '40px', height: '40px' }} alt="emergency fund icon" />
            <div style={{ marginLeft: '15px' }}>
              Assets<span style={{ marginLeft: '7px', color: 'blue', textDecoration: 'underline' }}>(View Chart)</span>
            </div>
          </MetricsCardTitle>

          <MetricsCardContent>
            <div style={{ marginBottom: '10px' }}>
              Current Emergency Fund: {CURRENCY_CODES[currency].symbol}
              {Math.round(emergencyFund)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Average Monthly Expense: {CURRENCY_CODES[currency].symbol}
              {Math.round(monthlyExpenses)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
            <div style={{ marginBottom: '10px' }}>
              Emergency Fund Coverage: {Math.round(emergencyFund / monthlyExpenses)} months
            </div>
            <div style={{ marginBottom: '10px' }}>Current Savings Rate: {savingsRate.toFixed(0) + '%'}</div>
          </MetricsCardContent>
        </MetricCard>
        <MetricCard
          onClick={() => {
            setSelectedChart('fire')
            const element = document.getElementById('chart')
            if(element) {
              element.scrollIntoView()
            }
          }}
          selected={selectedChart === 'fire'}
          style={{ marginRight: '10px' }}
        >
          <MetricsCardTitle>
            <img src={icon.independence} style={{ width: '40px', height: '40px' }} alt="financial independence icon" />

            <div style={{ marginLeft: '15px' }}>
              Financial Independence
              <span style={{ marginLeft: '7px', color: 'blue', textDecoration: 'underline' }}>(View Chart)</span>
            </div>
          </MetricsCardTitle>
          <MetricsCardContent>
            {fiYear !== -1 && (
              <div style={{ marginBottom: '10px' }}>
                Financially Independent In {table[fiYear].year} (Age {table[fiYear].age})
              </div>
            )}
            {fiYear !== -1 && (
              <div style={{ marginBottom: '10px' }}>
                Yearly Expenses at Financial Independence Point: {CURRENCY_CODES[currency].symbol}
                {Math.round(table[fiYear].expenses)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            )}

            {fiYear === -1 && <div style={{ marginBottom: '10px' }}>Financially Independence is Looking Unlikely!</div>}
          </MetricsCardContent>
        </MetricCard>
        <MetricCard selected={false}>
          <MetricsCardTitle>
            <img src={icon.scenario} style={{ width: '40px', height: '40px' }} alt="scenario icon" />
            <div style={{ marginLeft: '15px' }}>Scenario Manager</div>
          </MetricsCardTitle>
          <MetricsCardContent>
            <TextField
              style={{ marginBottom: '30px' }}
              id="scenario-income"
              fullWidth
              label="Monthly Income"
              InputProps={{
                startAdornment: <InputAdornment position="start">{CURRENCY_CODES[currency].symbol}</InputAdornment>,
                inputProps: {
                  step: 100
                }
              }}
              type="number"
              value={monthlyIncome ? monthlyIncome : ''}
              onChange={(event) =>
                editIncomeArrayNoDB([
                  ...income,
                  {
                    name: 'Scenario Income',
                    amount: parseInt(event.target.value === '' ? '0' : event.target.value) - monthlyIncome,
                    growth: 0.03
                  }
                ])
              }
            />
            <TextField
              id="scenario-expense"
              fullWidth
              label="Monthly Expense"
              InputProps={{
                startAdornment: <InputAdornment position="start">{CURRENCY_CODES[currency].symbol}</InputAdornment>,
                inputProps: {
                  step: 100
                }
              }}
              type="number"
              value={monthlyExpenses ? monthlyExpenses : ''}
              onChange={(event) =>
                editExpenseArrayNoDB([
                  ...expenses,
                  {
                    name: 'Scenario Expense',
                    amount: parseInt(event.target.value === '' ? '0' : event.target.value) - monthlyExpenses,
                    growth: 0.03
                  }
                ])
              }
            />
          </MetricsCardContent>
        </MetricCard>
      </MetricsRow>

      <FinancialIndependenceRow id="chart">
        {selectedChart === 'worth' && (
          <FinancialIndependenceChart>
            <FinancialIndCardTitle>
              <div>Net Worth Chart</div>
              <FormControl variant="outlined" style={{ marginLeft: 'auto' }}>
                <InputLabel id="demo-simple-select-outlined-label">Timeframe</InputLabel>
                <Select
                  labelId="set-chart-timeline"
                  id="set-chart-timeline"
                  value={timeframe}
                  onChange={(event) => setTimeframe(event.target.value)}
                  label="Chart Timeframe"
                >
                  <MenuItem value={5}>Five Years</MenuItem>
                  <MenuItem value={10}>Ten Years</MenuItem>
                  <MenuItem value={20}>Twenty Years</MenuItem>
                  <MenuItem value={30}>Thirty Years</MenuItem>
                  <MenuItem value={50}>Fifty Years</MenuItem>
                  <MenuItem value={70}>Seventy Years</MenuItem>
                </Select>
              </FormControl>
            </FinancialIndCardTitle>
            <FinancialIndCardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={netWorthTable.map((row) => {
                    row['liabilities'] = row['liabilities'] / 1000
                    row['assets'] = row['assets'] / 1000
                    row['networth'] = row['networth'] / 1000
                    return row
                  })}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomNetWorthTooltip />} />
                  <Legend />
                  {netWorthAnnotations.map((annotation: any, annotationNumber: number) => {
                    return (
                      <ReferenceLine
                        key={annotationNumber}
                        x={annotation.x}
                        stroke={
                          annotation.type === 'assetStart' || annotation.type === 'liabilityEnd' ? '#82ca9d' : 'red'
                        }
                      />
                    )
                  })}
                  <Line
                    type="monotone"
                    dataKey="liabilities"
                    name={`Liabilities (${CURRENCY_CODES[currency].symbol}'000)`}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="assets"
                    name={`Assets (${CURRENCY_CODES[currency].symbol}'000)`}
                    stroke="#82ca9d"
                    forma
                  />
                  <Line
                    type="monotone"
                    dataKey="networth"
                    name={`Net Worth (${CURRENCY_CODES[currency].symbol}'000)`}
                    stroke="black"
                    forma
                  />
                </LineChart>
              </ResponsiveContainer>
            </FinancialIndCardContent>
          </FinancialIndependenceChart>
        )}

        {selectedChart === 'assets' && (
          <FinancialIndependenceChart>
            <FinancialIndCardTitle>
              <div>Asset Breakdown</div>
            </FinancialIndCardTitle>
            <FinancialIndCardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={investments}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" name={`Asset Value (${CURRENCY_CODES[currency].symbol})`} />
                </BarChart>
              </ResponsiveContainer>
            </FinancialIndCardContent>
          </FinancialIndependenceChart>
        )}
        {selectedChart === 'fire' && (
          <FinancialIndependenceChart>
            <FinancialIndCardTitle>
              <div>Financial Independence Chart</div>
              <FormControl variant="outlined" style={{ marginLeft: 'auto' }}>
                <InputLabel id="demo-simple-select-outlined-label">Timeframe</InputLabel>
                <Select
                  labelId="set-chart-timeline"
                  id="set-chart-timeline"
                  value={timeframe}
                  onChange={(event) => setTimeframe(event.target.value)}
                  label="Chart Timeframe"
                >
                  <MenuItem value={5}>Five Years</MenuItem>
                  <MenuItem value={10}>Ten Years</MenuItem>
                  <MenuItem value={20}>Twenty Years</MenuItem>
                  <MenuItem value={30}>Thirty Years</MenuItem>
                  <MenuItem value={50}>Fifty Years</MenuItem>
                  <MenuItem value={70}>Seventy Years</MenuItem>
                </Select>
              </FormControl>
            </FinancialIndCardTitle>
            <FinancialIndCardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={table.map((row) => {
                    row['expenses'] = row['expenses'] / 1000
                    row['savingsReturn'] = row['investmentReturn'] / 1000
                    return row
                  })}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {annotations.map((annotation: any, annotationNumber: number) => {
                    return (
                      <ReferenceLine
                        key={annotationNumber}
                        x={annotation.x}
                        stroke={
                          annotation.type === 'expenseEnd' || annotation.type === 'incomeStart' ? '#82ca9d' : 'red'
                        }
                      />
                    )
                  })}
                  <Line
                    type="monotone"
                    dataKey="savingsReturn"
                    name={`Yearly Savings Return (${CURRENCY_CODES[currency].symbol}'000)`}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name={`Yearly Expenses (${CURRENCY_CODES[currency].symbol}'000)`}
                    stroke="#82ca9d"
                    forma
                  />
                </LineChart>
              </ResponsiveContainer>
            </FinancialIndCardContent>
          </FinancialIndependenceChart>
        )}
      </FinancialIndependenceRow>

      <Backdrop style={{ zIndex: 100, color: '#fff' }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardContainer>
  )
}

export default Dashboard
