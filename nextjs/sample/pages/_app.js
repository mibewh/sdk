import '../styles/globals.css'
import { CloudCMSWrapper } from '../context/CloudCMSContext';


function MyApp({ Component, pageProps }) {
  return (
    <CloudCMSWrapper>
      <Component {...pageProps} />
    </CloudCMSWrapper>
  )
}

export default MyApp
