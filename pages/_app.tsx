import {
  CustomFlowbiteTheme,
  Flowbite,
  ThemeModeScript,
  useThemeMode,
} from 'flowbite-react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Head from 'next/head'
const theme: CustomFlowbiteTheme = {
  floatingLabel: {
    label: {
      default: {
        outlined: {
          "sm": "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-xs text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-400 peer-focus:dark:text-blue-500",
          "md": "absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-400 peer-focus:dark:text-blue-500"
       
        },
      },
    },
  },
}
export default function App({ Component, pageProps }: AppProps) {
  const mode = useThemeMode()
  useEffect(() => {
    if (mode.mode !== 'dark') mode.setMode('dark')
  }, [mode.setMode])
  return (
    <Flowbite theme={{ theme }}>
      <Head>
        <ThemeModeScript />
      </Head>
      <Component {...pageProps} />
    </Flowbite>
  )
}
