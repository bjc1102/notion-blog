import { css, DefaultTheme } from 'styled-components'

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const darkTheme: DefaultTheme = {
  bgColor: '#2c3e50',
  textColor: '#f5f6fa',
  accentColor: '#e67e22',
}

export const Theme: DefaultTheme = {
  bgColor: 'whitesmoke',
  textColor: '#1b1b1b',
  accentColor: '#e67e22',
}
