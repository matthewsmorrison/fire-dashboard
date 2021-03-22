import styled from 'styled-components'
import { SIDEBAR_WIDTH, SIDEBAR_BREAKPOINT, PRIMARY_COLOUR } from 'style'
import { Link } from 'react-router-dom'

export const SidebarElement = styled.div`
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  background: ${PRIMARY_COLOUR};
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  padding: 20px;
  padding-top: 35px;
  font-size: 0.95rem;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    width: 0px;
    display: none;
  }
`

export const SidebarLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  line-height: 1.3;
  text-decoration: none;
  font-weight: 500;
  color: white;
  margin-bottom: 20px;
  transition: opacity 0.2s ease;
  user-select: none;

  &:hover {
    opacity: 1;
  }
`

export const SidebarHeader = styled.div`
  font-size: 1.1rem;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  user-select: none;
`

export const SidebarNonLink = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  line-height: 1.3;
  text-decoration: none;
  font-weight: 500;
  color: white;
  margin-bottom: 20px;
  transition: opacity 0.2s ease;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
