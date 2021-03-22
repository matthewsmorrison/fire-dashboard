import styled from 'styled-components'

export const MetricsRow = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100%;
  padding: 20px 20px 10px 20px;
  justify-content: space-between;
`

export const MetricCard = styled.div<{ selected: boolean }>`
  flex: 1;
  flex-direction: column;
  font-size: 0.9rem;
  display: flex;
  margin-bottom: 10px;
  background: white;
  min-width: 300px;
  margin-bottom: 10px;
  border-radius: 4px;
  min-height: 100%;
  box-shadow: rgba(37, 11, 54, 0.04) 0px 2px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.selected ? '#9ecaed' : `rgb(198, 190, 207)`)};
  user-select: none;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in;

  &:hover {
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 20px #9ecaed;
  }
`

export const MetricsCardTitle = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-bottom: 2px solid rgb(198, 190, 207);
  padding: 20px;
`

export const MetricsCardContent = styled.div`
  padding: 20px;
  font-size: 0.9rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const FinancialIndependenceRow = styled.div`
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100%;
  padding: 10px 20px 10px 20px;
  margin-top: auto;
  justify-content: space-between;
`

export const FinancialIndependenceChart = styled.div`
  height: 100%;
  flex: 3;
  font-size: 0.9rem;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  min-height: 100%;
  box-shadow: rgba(37, 11, 54, 0.04) 0px 2px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(198, 190, 207);
`

export const FinancialIndCardTitle = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-bottom: 2px solid rgb(198, 190, 207);
  padding: 20px;
`

export const FinancialIndCardContent = styled.div`
  padding: 20px;
  font-size: 0.85rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`
