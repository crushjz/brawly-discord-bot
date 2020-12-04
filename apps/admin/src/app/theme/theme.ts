import { extendTheme } from '@chakra-ui/react'

export const brawlyTheme = extendTheme({
  fonts: {
    body: `Whitney, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    heading: 'inherit',
  },
})

export type BrawlyTheme = typeof brawlyTheme
