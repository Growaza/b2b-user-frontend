import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Router } from 'next/router'
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

// const theme = create

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
		setLoading(true);
	})
	Router.events.on('routeChangeComplete', () => {
		setLoading(false);
	})


  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        {loading && (
              <div className="loader">
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
                  <CircularProgress />
                </Backdrop>
              </div>
            )}

      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
