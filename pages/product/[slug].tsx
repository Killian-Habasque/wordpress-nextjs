import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import ProductHeader from "../../components/product-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import { CMS_NAME } from "../../lib/constants";
import { getAllProductsWithSlug, getProductAndMoreProducts } from "../../lib/requests/product/queries";
import Content from "../../components/content";

export default function Product({ product, moreProducts, preview }) { // Renommer et ajuster les props
  const router = useRouter();
  const defaultImageUrl = '/images/default-image.png';
  const author = {
    node: {
        name: "John",
        avatar : {
            url : defaultImageUrl
        }
    }
  };
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${product.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={product.featuredImage?.node.sourceUrl}
                />
              </Head>
              <ProductHeader
                title={product.title}
                coverImage={product.featuredImage}
                date={product.date}
                // author={author}
                categories={product.categories}
              />
              <PostBody content={product.content} />
            </article>

            <Content content={product.blocks.content} />

            <SectionSeparator />
            {moreProducts.length > 0 && <MoreStories posts={moreProducts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getProductAndMoreProducts(params?.slug, preview, previewData); // Utiliser la requête pour les produits

  return {
    props: {
      preview,
      product: data.product, // Ajuster pour les produits
      moreProducts: data.products, // Ajuster pour les produits
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
