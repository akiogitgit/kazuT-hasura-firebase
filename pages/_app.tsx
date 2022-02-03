import '../styles/globals.css'
// import type { AppProps } from 'next/app'だとエラー出る
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
