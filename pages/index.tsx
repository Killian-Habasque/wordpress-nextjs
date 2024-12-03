import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/layouts/container";
import PageLayout from "../components/layouts/page_layout";
import { getPage } from "../lib/requests/page";
import Content from "../components/layouts/content";
import parse from "html-react-parser";
import HeroBackgroundImage from "../components/blocks/hero/hero_bg_image";

export default function Index({ page, preview }) {
  const fullHead = page?.seo ? parse(page.seo.fullHead) : null;

  return (
    <PageLayout preview={preview}>
      <Head>
        {fullHead}
      </Head>
      <HeroBackgroundImage title={page.title} description={page.datapage.description} link={page.datapage.link} featuredImage={page.featuredImage}></HeroBackgroundImage>

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
  const data = await getPage('accueil', preview, previewData);

  return {
    props: {
      preview,
      page: data.page
    },
    revalidate: 10,
  };
};
