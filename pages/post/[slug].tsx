import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/layouts/container";
// import MoreStories from "../../components/more-stories";
import SectionSeparator from "../../components/elements/separator";
import PostTitle from "../../components/elements/title";
import Tags from "../../components/elements/tags";
import { CMS_NAME } from "../../lib/constants";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/requests/post";
import HeroPost from "../../components/blocks/hero/hero_post";
import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout preview={preview}>
      <Container>

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

              {/* <Content content={post.blocks.content} /> */}

              {/* <PostBody content={post.content} /> */}
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          </>
        )}
      </Container>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts
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
