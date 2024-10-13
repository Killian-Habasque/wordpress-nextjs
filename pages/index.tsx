import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/post-header";
import Intro from "../components/intro";
import Products from "../components/products";
import RelationLists from "../components/blocks/relationLists";

import { CMS_NAME } from "../lib/constants";
import { getAllProducts } from "../lib/requests/product/queries";
import { getAllPostsForHome } from "../lib/requests/post/queries";
import PageLayout from "../components/layout/page_layout";

export default function Index({ preview, allProducts }) {
  const products = allProducts.nodes;

  return (
    <PageLayout preview={preview}>
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
      </Container>
    </PageLayout>
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
