import styled, { createGlobalStyle } from 'styled-components'
export const SIDEBAR_WIDTH = 270
export const SIDEBAR_BREAKPOINT = 1024
export const PRIMARY_COLOUR = '#321b3b'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
  }

  html, body {
    height: 100%;
    width: 100%;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    font-weight: 400;
    font-size: 15.6px;
    background-color: #fafafa;
    line-height: 1.167;
  }

  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }

  button {
    /* font-family: Space Mono,"Helvetica",Arial,sans-serif; */
    font-weight: 500;
    font-size: 15.6px;
  }

  input {
    /* font-family: Open Sans,"Helvetica",Arial,sans-serif; */
    font-weight: 400;
    font-size: 15.6px;
  }

  ul{
    margin-left:10px;
  }

  /* Second Level */
  ul ul{
    margin-left:15px;
  }

  /* Third Level */
  ul ul ul{
    margin-left:20px;
  }
`

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  background: #f3f2f1;
  margin-left: ${SIDEBAR_WIDTH}px;
  padding: 20px;

  @media only screen and (max-width: ${SIDEBAR_BREAKPOINT}px) {
    margin-left: 0px;
  }
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  padding: 20px;
  user-select: none;
`

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;
  padding: 20px;
  user-select: none;
`

export const DashboardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
`
