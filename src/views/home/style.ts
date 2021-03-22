import styled from 'styled-components'
import { SIDEBAR_BREAKPOINT } from 'style'

export const NavBar = styled.nav`
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #ebeaeb;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
  padding: 0 3rem;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    padding: 0 1rem;
  }
`

export const NavRow = styled.div`
  height: 100%;
  width: calc(100% - 4rem);
  display: flex;
  align-items: center;
  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    width: 100%;
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  height: 100%;
`

export const NavItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 30px;
`

export const NavButton = styled.button`
  margin-left: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1rem;
  background-color: #4a83f3;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 2px;
  color: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
  border-image: initial;
  border-radius: 4px;
  transition: background 0.2s ease-in-out 0s;
  background: rgb(74, 131, 243);

  &:hover {
    background: rgb(41, 110, 248);
  }

  &:focus {
    outline: 0;
  }
`

export const Billboard = styled.section`
  padding-top: 16rem;
  padding-bottom: 10rem;
  max-width: none;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    padding-top: 7rem;
  }
`

export const BillboardContent = styled.div`
  display: grid;
  grid-column-gap: 5%;
  grid-template-columns: 50% 45%;
  align-items: center;
  justify-items: self-end;
  font-size: 0.875rem;
  padding: 0 3rem;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    padding: 0 1rem;
    grid-template-columns: 100%;
  }
`

export const BillboardMessage = styled.div`
  order: 1;
  text-align: left;
  width: 100%;
`

export const BillboardHeadline1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
`
export const BillboardHeadline2 = styled.div`
  font-weight: 700;
  line-height: 1.1875;
  letter-spacing: -0.8px;
  font-size: 3rem;
  margin-bottom: 4rem;
`

export const BillboardCopy = styled.div`
  font-size: 1.25rem;
  margin-bottom: 4rem;
`

export const BillboardCTAButton = styled.button`
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  background-color: #4a83f3;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 2px;
  color: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
  border-image: initial;
  border-radius: 4px;
  transition: background 0.2s ease-in-out 0s;
  background: rgb(74, 131, 243);

  &:hover {
    background: rgb(41, 110, 248);
  }

  &:focus {
    outline: 0;
  }
`

export const BillboardImage = styled.div`
  order: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    width: 0px;
    display: none;
  }
`

export const GlassesImage = styled.img`
  /* position: absolute; */
  /* display: block; */
  margin: auto;
  z-index: 2;
`

export const SectionFeature = styled.div`
  padding: 5rem 5rem;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    padding: 1rem 1rem;
  }
`

export const SectionFeatureAlt = styled(SectionFeature)`
  background-color: #f5f5f5;
`

export const SectionHeading = styled.div`
  width: 100%;
  font-weight: 700;
  line-height: 1.1875;
  letter-spacing: -0.8px;
  font-size: 2rem;
  margin-bottom: 2rem;
`

export const SectionContent = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`

export const SectionImage = styled.img`
  width: 70%;
  margin-top: 30px;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    width: 100%;
  }
`
