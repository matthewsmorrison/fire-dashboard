import styled from 'styled-components'

import { SIDEBAR_BREAKPOINT } from 'style'

export const MobileMenuItem = styled.div`
  display: none;
  margin-right: 0px;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    display: flex;
    margin-right: 10px;
  }
`
