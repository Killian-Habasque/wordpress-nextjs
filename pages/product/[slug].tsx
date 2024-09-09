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
import Hero from "../../components/test-hero";
import DesktopGallery from "../../components/desktop_gallery";
import {
  ButtonAddToCart,
} from "../../components/ui/buttons";
import Categories from "../../components/categories";
import Date from "../../components/date";

export default function Product({ product, moreProducts, preview }) { // Renommer et ajuster les props
  const router = useRouter();
  const defaultImageUrl = '/images/default-image.png';
  const author = {
    node: {
      name: "John",
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
      <Container>
        <Header />

        {/* <Hero /> */}


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

              <section className="grid md:grid-cols-2 md:place-content-between md:place-items-center md:gap-2">

                {product.products?.gallery?.nodes?.length > 0 && (
                  <DesktopGallery
                    gallery={product.products.gallery.nodes}
                    className="h-full md:grid md:max-h-[565px] md:max-w-[445px] md:gap-8"
                  />
                )}

                <section className="w-full">
                  {/* <h1 className="text-xs font-bold uppercase tracking-widest text-clr-orange-dark md:text-sm">
                    Marque
                  </h1> */}
                  <div className="mx-auto">
                    <div className="mb-6 text-lg">
                      Posted <Date dateString={product.date} />
                      <Categories categories={product.categories} />
                    </div>
                  </div>
                  <h2 className="text-[1.75rem] font-bold leading-snug md:text-[2.75rem] md:leading-[3rem]">
                    {product.title}
                  </h2>

                  <p className="text-[0.9375rem] text-clr-blue-600 md:text-base ">
                    Ceci est la description
                  </p>
                  <div className=" grid gap-4 md:gap-8">
                    <div className=" flex w-full items-center justify-between md:flex-col md:items-start md:gap-3">
                      <div className="flex items-center gap-6">
                        <span className="text-[1.75rem] font-bold">
                          <span className="sr-only">Discounted price</span>
                          40 €
                        </span>
                        <span className="rounded-lg bg-clr-orange-light px-2 py-1 text-base font-bold text-clr-orange-dark">
                          <span className="sr-only">Discounted %</span>
                          50
                        </span>
                      </div>
                      <span className="font-bold text-clr-blue-400 line-through">
                        <span className="sr-only">Original price</span>
                        50 €
                      </span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[37%,63%]">

                      {/* <ButtonAddToCart
                        className={
                          "flex h-[3.5rem] w-full cursor-pointer items-center justify-center  gap-6  rounded-xl bg-clr-orange-dark font-bold text-white drop-shadow-[0_25px_25px_rgba(255,125,26,0.25)] hover:opacity-75 md:drop-shadow-none"
                        }
                        onClick={() => {
                          console.log("add")
                        }}
                      /> */}
                      <button
                        className={
                          "bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
                        }
                        onClick={() => {
                          console.log("add")
                        }}
                      >Add to cart</button>
                    </div>
                  </div>
                </section>

              </section>
              {/* <ProductHeader
                title={product.title}
                coverImage={product.featuredImage}
                date={product.date}
                // author={author}
                categories={product.categories}
              /> */}
              {/* <PostBody content={product.content} /> */}
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
