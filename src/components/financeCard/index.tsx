import React from 'react'
import {
  FinancialCard,
  FinancialCardTitle,
  FinancialCardContent,
  FinancialCardFooter
} from 'components/financeCard/style'
import Tooltip from '@material-ui/core/Tooltip'
import { icon } from 'assets'
import { Skeleton } from '@material-ui/lab'

interface FinancialCardProps {
  name: string
  url: string
  iconType: string
  editClick: () => void
  deleteClick: () => void
  content: string
  loading?: boolean
  live?: boolean
}

const FinanceCard: React.FC<FinancialCardProps> = ({
  name,
  url,
  iconType,
  editClick,
  deleteClick,
  content,
  loading,
  live
}: FinancialCardProps) => {
  if (!loading)
    return (
      <FinancialCard>
        <FinancialCardTitle>
          <img alt={'icon alt'} style={{ width: '30px', height: '30px' }} src={icon[iconType]} />
          {url === '' && <div style={{ marginLeft: '20px' }}>{name}</div>}
          {url !== '' && (
            <a style={{ marginLeft: '20px', color: '#4b83f2' }} href={url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          )}
          <Tooltip title={'Edit'} style={{ cursor: 'pointer', marginLeft: 'auto', width: '20px', height: '20px' }}>
            <img src={icon.pencil} alt="pencil" onClick={editClick} />
          </Tooltip>
          <Tooltip title={'Delete'} style={{ cursor: 'pointer', marginLeft: '15px', width: '20px', height: '20px' }}>
            <img src={icon.cross} alt="cross" onClick={deleteClick} />
          </Tooltip>
        </FinancialCardTitle>
        <FinancialCardContent>{content}</FinancialCardContent>
        {live && (
          <FinancialCardFooter>
            <img style={{ marginLeft: 'auto', height: '100%' }} src={icon.live} alt="live" />
          </FinancialCardFooter>
        )}
      </FinancialCard>
    )
  else
    return (
      <FinancialCard>
        <FinancialCardTitle>
          {' '}
          <Skeleton width={'100%'} height={'100%'} />
        </FinancialCardTitle>
        <FinancialCardContent>
          {' '}
          <Skeleton width={'100%'} height={'100%'} />
        </FinancialCardContent>
      </FinancialCard>
    )
}

export default FinanceCard
