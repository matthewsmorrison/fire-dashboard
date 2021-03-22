import styled from 'styled-components'

export const AddRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  margin-top: auto;
`

export const IncomeRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`

export const IncomeCard = styled.div`
  flex: 1;
  margin-right: 15px;
  flex-direction: column;
  font-size: 0.9rem;
  display: flex;
  background: white;
  width: 350px;
  border-radius: 4px;
  height: 200px;
  box-shadow: rgba(37, 11, 54, 0.04) 0px 2px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(198, 190, 207);
  user-select: none;
`

export const IncomeCardTitle = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid rgb(198, 190, 207);
  padding: 20px;
`

export const IncomeCardContent = styled.div`
  padding: 20px;
  font-size: 0.9rem;
  flex: 1;
  line-height: 1.3;
  display: flex;
  flex-direction: column;
`
