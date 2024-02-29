import '@/styles/globals.css';
import '/styles/homeStats.css';
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from '../lib/edgestore';


export default function App({ Component, pageProps: { session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
    <EdgeStoreProvider>
      <Component {...pageProps}/>
      </EdgeStoreProvider>
    </SessionProvider>
  )
}