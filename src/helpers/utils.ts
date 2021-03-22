export function isValidEmail(email: string) {
  return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  )
}

export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatPercentage(number: number) {
  return number * 100
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function PMT(rate, nperiod, pv, fv, type) {
  if (!fv) fv = 0
  if (!type) type = 0

  if (rate === 0) return -(pv + fv) / nperiod

  const pvif = Math.pow(1 + rate, nperiod)
  let pmt = (rate / (pvif - 1)) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= 1 + rate
  }

  return pmt
}

export const IPMT = (pv, pmt, rate, per) => {
  const tmp = Math.pow(1 + rate, per)
  return 0 - (pv * tmp * rate + pmt * (tmp - 1))
}

export const PPMT = (rate, per, nper, pv, fv, type) => {
  if (per < 1 || per >= nper + 1) return null
  const pmt = PMT(rate, nper, pv, fv, type)
  const ipmt = IPMT(pv, pmt, rate, per - 1)
  return pmt - ipmt
}
