import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../components/layouts/container";
import MoreStories from "../components/more-stories";

import SectionSeparator from "../components/elements/separator";
import PostTitle from "../components/elements/title";

import Tags from "../components/elements/tags";
import { CMS_NAME } from "../lib/constants";
import { getAllProductsWithSlug, getProductAndMoreProducts } from "../lib/requests/product/queries";
import Content from "../components/layouts/content";
import Example from "../components/blocks/header";
import HeroProduct from "../components/blocks/product/hero_product";
import parse from "html-react-parser";
import PageLoading from "../components/pages/loading";
import PageLayout from "../components/layouts/page_layout";
import { getAllPagesWithSlug, getPage } from "../lib/requests/page/queries";


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

            {page.title}
            {/* <HeroProduct
              title={page.title}
              productInfo={page.products}
              categories={page.categories}
            /> */}

            {/* <Content content={page.blocks.content} /> */}

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
