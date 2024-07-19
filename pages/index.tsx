import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Products from "../components/products";

import { CMS_NAME } from "../lib/constants";
import { getAllProducts } from "../lib/requests/product/queries";
import { getAllPostsForHome } from "../lib/requests/post/queries";

export default function Index({ allPosts: { edges }, preview, allProducts }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);
  const products = allProducts.nodes;

  return (
    <Layout preview={preview}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {products && (
          <Products
            products={products}
          />
        )}  
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const allProducts = await getAllProducts();

  return {
    props: { allPosts, preview, allProducts },
    revalidate: 10,
  };
};
