import React from 'react'
import {
  NavBar,
  NavRow,
  Logo,
  NavButton,
  Billboard,
  BillboardContent,
  BillboardMessage,
  BillboardHeadline2,
  BillboardCopy,
  BillboardCTAButton,
  BillboardImage,
  GlassesImage,
  SectionFeature,
  SectionFeatureAlt,
  SectionHeading,
  SectionContent,
  SectionImage
} from 'views/home/style'
import { useAuthStore } from 'hooks/auth'

import { icon } from 'assets'

const Home: React.FC = () => {
  const { uid } = useAuthStore()

  return (
    <>
      <header role="banner">
        <NavBar role="navigation" aria-label="Primary Navigation">
          <NavRow>
            <Logo>
              <a href="/" aria-label="OnlineEyeCheckup">
                Financial Dashboard
              </a>
            </Logo>

            {uid && (
              <a style={{ marginLeft: 'auto', fontWeight: 600 }} href="/dashboard">
                <NavButton>Go To Dashboard</NavButton>
              </a>
            )}

            {!uid && (
              <a style={{ marginLeft: 'auto', fontWeight: 600 }} href="/signin">
                Login
              </a>
            )}

            {!uid && (
              <a style={{ marginLeft: '15px' }} href="/signin">
                <NavButton>Get Started</NavButton>
              </a>
            )}
          </NavRow>
        </NavBar>
      </header>

      <main>
        <Billboard>
          <BillboardContent>
            <BillboardMessage>
              <BillboardHeadline2>Free and simple financial health tracking...with no spreadsheets.</BillboardHeadline2>

              <BillboardCopy>
                Simply input your assets, liabilities, income and expenses to monitor key financial goals and easily
                calculate your net worth and forecast financial independence.
              </BillboardCopy>

              <a href="/signin">
                <BillboardCTAButton>Get Started</BillboardCTAButton>
              </a>
            </BillboardMessage>

            <BillboardImage>
              <GlassesImage src={icon.landing} />
            </BillboardImage>
          </BillboardContent>
        </Billboard>

        <SectionFeatureAlt>
          <SectionHeading>Monitor your financial health</SectionHeading>
          <SectionContent>
            Monitor your finances against several financial health goals (emergency savings, high interest debt...)
            <br />
            <br />
            <SectionImage src={icon.health} alt="Financial Metrics Screen" />
          </SectionContent>
        </SectionFeatureAlt>

        <SectionFeature>
          <SectionHeading>Calculate current and forecasted net worth</SectionHeading>
          <SectionContent>
            Input your assets and liabilities to automatically calculate your current and forecasted net worth.
            <br />
            <br />
            <SectionImage src={icon.networth} alt="Net Worth Screen" />
          </SectionContent>
        </SectionFeature>

        <SectionFeatureAlt>
          <SectionHeading>See if you are on track for Financial Independence/FIRE</SectionHeading>
          <SectionContent>
            Check whether you are on track for Financial Independence and use scenarios to see what happens if you boost
            your income or cut your expenses.
            <br />
            <br />
            <SectionImage src={icon.fire} alt="FIRE Screen" />
          </SectionContent>
        </SectionFeatureAlt>
      </main>
    </>
  )
}

export default Home
