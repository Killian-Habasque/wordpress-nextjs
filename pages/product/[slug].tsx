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


export default function Product({ product, moreProducts, preview, header }) {
  const router = useRouter();
  const defaultImageUrl = '/images/default-image.png';
  const author = {
    node: {
      name: "John",
      firstName: "Killian",
      lastName: "Habasque",
      avatar: {
        url: defaultImageUrl
      }
    }
  };
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      {/* <Example menu={header}/> */}
      {/* <Header menu={header}/> */}
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Head>
            <title>
              {`${product.title} | Next.js Blog Example with ${CMS_NAME}`}
            </title>
            <meta
              property="og:image"
              content={product.featuredImage?.node.sourceUrl}
            />
          </Head>

          <div className="bg-gray-50">
            <HeroProduct
              title={product.title}
              productInfo={product.products}
              // date={product.date}
              // author={author}
              categories={product.categories}
            />
            {/* <ProductHero
              title={product.title}
              gallery={product.products?.gallery?.nodes}
              date={product.date}
              author={author}
              categories={product.categories} /> */}

            <Content content={product.blocks.content} />

            {/* <SectionSeparator /> */}
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
  const data = await getProductAndMoreProducts(params?.slug, preview, previewData); // Utiliser la requête pour les produits
  const header = await getHeader();

  return {
    props: {
      preview,
      product: data.product, // Ajuster pour les produits
      moreProducts: data.products, // Ajuster pour les produits
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
