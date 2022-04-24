import 'styled-components'

declare module 'styled-components' {
  //styled-components의 테마 정의를 확장하는 것
  //DefaultTheme으로 export
  export interface DefaultTheme {
    accentColor: string
    bgColor: string
    textColor: string
  }
}
