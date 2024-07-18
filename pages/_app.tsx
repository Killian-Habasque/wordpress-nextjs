// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/index.css";
import { HeaderProvider } from "../components/HeaderContext";
import { getHeader } from "../lib/api";
import App from "next/app";

function MyApp({ Component, pageProps, menu }) {
  return (
    <HeaderProvider initialMenu={menu}>
      <Component {...pageProps} />
    </HeaderProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const menu = await getHeader('Header');
  return { ...appProps, menu };
};

export default MyApp;
