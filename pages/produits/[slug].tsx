import React from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import parse from "html-react-parser";



import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";
import { getAllCategoriesWithSlug, getCategory } from "../../lib/requests/categories/queries";
import { getAllProductCategoriesWithSlug, getProductCategory } from "../../lib/requests/categories-product/queries";
import Breadcrumb from "../../components/elements/breadcrumb";
import HeroCategories from "../../components/blocks/hero/hero_categories";
import GridAside from "../../components/layouts/grid_aside";
import Aside from "../../components/elements/aside";
import GridProducts from "../../components/layouts/grid_products";
import { getAllFilters } from "../../lib/requests/product/queries";


export default function Page({ filters, productCategory }) {
  const router = useRouter();
  const fullHead = productCategory?.seo ? parse(productCategory.seo.fullHead) : null;

  if (!router.isFallback && !productCategory?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout preview={null}>

      {router.isFallback ? (
        <PageLoading>Loading…</PageLoading>
      ) : (

        <>
          <Head>
            {fullHead}
          </Head>

          <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <Breadcrumb />
            <HeroCategories title={productCategory.name} description={productCategory.description} categories={filters.productCategories} />
            <GridAside>
              <Aside filters={filters} />
              <GridProducts items={productCategory.products.nodes} />
            </GridAside>
          </div>

        </>
      )}

    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const data = await getProductCategory(params?.slug);
  const filters = await getAllFilters();
  
  return {
    props: {
      productCategory: data.productCategory,
      filters: filters
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllProductCategoriesWithSlug();
  console.log(allCategories)
  return {
    paths: allCategories.edges.map(({ node }) => `/produits/${node.slug}`) || [],
    fallback: true,
  };
};
