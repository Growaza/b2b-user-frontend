// ** MUI Imports
import { motion, useViewportScroll } from "framer-motion";
import Head from 'next/head'
import NavBar from "./NavBar";

const MainLayout = ({ children }) => {
  const { scrollYProgress } = useViewportScroll();
  return (
    <motion.path
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{ pathLength: scrollYProgress }}
    >
      <div className="bg-stone-800">
        <Head>
          <title>B2B Cabs</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/main.png" />
        </Head>

        <main className="h-full bg-stone-800 scroll-smooth">
          <NavBar />
          {children}
        </main>
      </div>
    </motion.path>
  )
}

export default MainLayout