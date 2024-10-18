import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/layouts/container";
import MoreStories from "../../components/more-stories";

import SectionSeparator from "../../components/elements/separator";
import PostTitle from "../../components/elements/title";

import Tags from "../../components/elements/tags";
import { CMS_NAME } from "../../lib/constants";
import { getAllProductsWithSlug, getProductAndMoreProducts } from "../../lib/requests/product/queries";
import Content from "../../components/layouts/content";
import Example from "../../components/blocks/header";
import HeroProduct from "../../components/blocks/product/hero_product";
import parse from "html-react-parser";
import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";


export default function Product({ product, moreProducts, preview }) {
  const router = useRouter();
  const fullHead = product?.seo ? parse(product.seo.fullHead) : null;

  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout preview={preview}>

      {router.isFallback ? (
        <PageLoading>Loading…</PageLoading>
      ) : (
        
        <>
          <Head>
            { fullHead }
          </Head>

          <div className="bg-gray-50">
            <HeroProduct
              title={product.title}
              productInfo={product.products}
              categories={product.categories}
            />

            <Content content={product.blocks.content} />

            {/* <SectionSeparator /> */}
            {moreProducts.length > 0 && <MoreStories posts={moreProducts} />}
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
  const data = await getProductAndMoreProducts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      product: data.product, 
      moreProducts: data.products
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts = await getAllProductsWithSlug(); // Utiliser la requête pour les produits

  return {
    paths: allProducts.edges.map(({ node }) => `/product/${node.slug}`) || [],
    fallback: true,
  };
};
