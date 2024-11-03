import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import parse from "html-react-parser";

import { getAllCategoriesWithSlug, getCategory } from "../../lib/requests/categories/queries";
import PageLayout from "../../components/layouts/page_layout";
import PageLoading from "../../components/pages/loading";


export default function Page({ category, preview }) {
  const router = useRouter();
  const fullHead = category?.seo ? parse(category.seo.fullHead) : null;

  if (!router.isFallback && !category?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  console.log(category)
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

            {/* <HeroPage title={page.title} featuredImage={page.featuredImage}/>
            <Content content={page.blocks.content} /> */}
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
  const data = await getCategory(params?.slug);

  return {
    props: {
      category: data.category
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllCategoriesWithSlug();

  return {
    paths: allCategories.edges.map(({ node }) => `/categorie/${node.slug}`) || [],
    fallback: true,
  };
};
