import React, { useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import parse from "html-react-parser";
import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";
import { getAllProductCategoriesWithSlug, getProductCategory, refetchProductCategory } from "../../lib/requests/categories-product/queries";
import Breadcrumb from "../../components/elements/breadcrumb";
import HeroCategories from "../../components/blocks/hero/hero_categories";
import GridAside from "../../components/layouts/grid_aside";
import Aside from "../../components/elements/aside";
import GridProducts from "../../components/layouts/grid_products";
import { getAllFilters } from "../../lib/requests/product/queries";


export default function Page({ filters, productCategory }) {
  const router = useRouter();

  const [products, setProducts] = useState(productCategory.products.nodes);
  const [pageInfo, setPageInfo] = useState(productCategory.products.pageInfo);
  const [loading, setLoading] = useState(false);

  const fullHead = productCategory?.seo ? parse(productCategory.seo.fullHead) : null;

  if (!router.isFallback && !productCategory?.slug) {
    return <ErrorPage statusCode={404} />;
  }


  const loadMoreProducts = async () => {
    if (!pageInfo.hasNextPage || loading) return;

    setLoading(true);
    const data = await refetchProductCategory(productCategory.slug, pageInfo.endCursor, 5);
    const newProducts = data.productCategory.products.nodes;
    const newPageInfo = data.productCategory.products.pageInfo;

    setProducts((prev) => [...prev, ...newProducts]);
    setPageInfo(newPageInfo);
    setLoading(false);
  };

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
              <GridProducts items={products} />

              {pageInfo.hasNextPage && (
                <div className="text-center mt-8">
                  <button onClick={loadMoreProducts} disabled={loading} className="btn-primary">
                    {loading ? "Chargement..." : "Charger plus"}
                  </button>
                </div>
              )}
            </GridAside>
          </div>

        </>
      )}

    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProductCategory(params?.slug, 5);
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
  return {
    paths: allCategories.edges.map(({ node }) => `/produits/${node.slug}`) || [],
    fallback: true,
  };
};
