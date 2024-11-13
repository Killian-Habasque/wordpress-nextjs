import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Content from "../components/layouts/content";
import parse from "html-react-parser";
import PageLoading from "../components/pages/loading";
import PageLayout from "../components/layouts/page_layout";
import { getAllPagesWithSlug, getPage } from "../lib/requests/page";
import HeroPage from "../components/blocks/hero/hero_page";


export default function Page({ page, preview }) {
  const router = useRouter();
  const fullHead = page?.seo ? parse(page.seo.fullHead) : null;

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PageLayout preview={preview}>

      {router.isFallback ? (
        <PageLoading>Loading…</PageLoading>
      ) : (

        <>
          <Head>
            {fullHead}
          </Head>

          <div className="bg-gray-50">
            <HeroPage title={page.title} featuredImage={page.featuredImage}/>
            <Content content={page.blocks.content} />
          </div>

        </>
      )}

    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPage(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      page: data.page
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesWithSlug();

  return {
    paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
};
