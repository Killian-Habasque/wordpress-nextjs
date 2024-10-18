import { AppProps } from "next/app";
import "../styles/index.css";
import AppLayout from "../components/layouts/app_layout";
import { getFooter, getHeader } from "../lib/requests/menu/queries";
import { NextPageContext } from 'next'

export default function Page({ Component, pageProps }: AppProps) {
  return (
    <AppLayout header={pageProps.header} footer={pageProps.footer}>
      <Component {...pageProps} />
    </AppLayout>
  );
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const header = await getHeader();
  const footer = await getFooter();
  return {
    pageProps: {
      header,
      footer
    },
  };
}
