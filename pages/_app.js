import '../styles/globals.css'
import { motion } from 'framer-motion'
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps, router, isVisible }) {
  const transisi = () => {
    if (router.isReady) {
      switch (router.state.pathname) {
        case '/register':
        case '/home':
          return { x: "100%" }
        default:
          return { x: "-100%" }
          break;
      }
    }
    else{
      return { x: "-100%" }
    }
  }
    return (
      <>
        <NextNProgress color="#fff" height={5} />
        <motion.div
          key={router.route} // add this one
          layout
          initial={transisi()}
          animate={{ x: "calc(100vw - 100%)" }}
          transition={{ delay: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </>
    )
}
