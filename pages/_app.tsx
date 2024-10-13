import { AppProps } from "next/app";
import "../styles/index.css";
import AppLayout from "../components/layout/app_layout";
import { getHeader } from "../lib/requests/menu/queries";
import { NextPageContext } from 'next'

export default function Page({ Component, pageProps }: AppProps) {
  return (
    <AppLayout header={pageProps.header}>
      <Component {...pageProps} />
    </AppLayout>
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const header = await getHeader();
  return {
    pageProps: {
      header,
    },
  };
}
