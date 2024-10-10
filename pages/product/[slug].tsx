import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";

import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";

import Tags from "../../components/tags";
import { CMS_NAME } from "../../lib/constants";
import { getAllProductsWithSlug, getProductAndMoreProducts } from "../../lib/requests/product/queries";
import Content from "../../components/content";
import { getHeader } from "../../lib/requests/menu/queries";
import Example from "../../components/blocks/header";
import Header from "../../components/blocks/navigation/header";
import HeroProduct from "../../components/blocks/product/hero_product";
import parse from "html-react-parser";
import PageLoading from "../../components/loading";


export default function Product({ product, moreProducts, preview, header }) {
  const router = useRouter();
  const fullHead = parse(product.seo.fullHead);

  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>

      <Header menu={header} />

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
              // date={product.date}
              // author={author}
              categories={product.categories}
            />

            <Content content={product.blocks.content} />

            <SectionSeparator />
            {moreProducts.length > 0 && <MoreStories posts={moreProducts} />}
          </div>

        </>
      )}

    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getProductAndMoreProducts(params?.slug, preview, previewData);
  const header = await getHeader();

  return {
    props: {
      preview,
      product: data.product, 
      moreProducts: data.products, 
      header: header
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
