import styled from 'styled-components'
import { SIDEBAR_BREAKPOINT } from 'style'

export const FinancialCard = styled.div`
  flex: 1;
  margin-right: 15px;
  flex-direction: column;
  font-size: 0.9rem;
  display: flex;
  background: white;
  margin-bottom: 20px;
  min-width: 300px;
  max-width: 300px;
  border-radius: 4px;
  height: 200px;
  box-shadow: rgba(37, 11, 54, 0.04) 0px 2px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(198, 190, 207);
  user-select: none;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    min-width: 220px;
  }
`

export const FinancialCardTitle = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgb(198, 190, 207);
  padding: 20px;
`

export const FinancialCardContent = styled.div`
  padding: 20px;
  font-size: 0.9rem;
  flex: 1;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
`
export const FinancialCardFooter = styled.div`
  padding: 7px;
  font-size: 0.9rem;
  height: 50px;
  line-height: 1.3;
  display: flex;
`
