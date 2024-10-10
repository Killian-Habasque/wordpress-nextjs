import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/blocks/navigation/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import { CMS_NAME } from "../../lib/constants";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/requests/post/queries";
import HeroPost from "../../components/blocks/post/hero_post";
import { getHeader } from "../../lib/requests/menu/queries";
import PageLoading from "../../components/loading";

export default function Post({ post, posts, preview, header }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Header menu={header} />
      <Container>
        {/* <Header /> */}
        {router.isFallback ? (
          <PageLoading>Loading…</PageLoading>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <HeroPost
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.featuredImage}
                author={post.author}
                date={post.date}
                categories={post.categories} />
              {/* <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              /> */}
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
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
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);
  const header = await getHeader();

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      header: header
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/post/${node.slug}`) || [],
    fallback: true,
  };
};
