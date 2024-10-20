import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/layouts/container";
import PageLayout from "../components/layouts/page_layout";
import { getPage } from "../lib/requests/page/queries";
import Content from "../components/layouts/content";
import parse from "html-react-parser";

export default function Index({ page, preview }) {
  const fullHead = page?.seo ? parse(page.seo.fullHead) : null;

  return (
    <PageLayout preview={preview}>
      <Head>
        {fullHead}
      </Head>
      <Container>
        {/* HeroFrontpage */}
        <Content content={page.blocks.content} />
      </Container>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPage('homepage', preview, previewData);

  return {
    props: {
      preview,
      page: data.page
    },
    revalidate: 10,
  };
};
