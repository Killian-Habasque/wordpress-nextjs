import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import parse from "html-react-parser";
import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";
import { getAllProductCategoriesWithSlug, getCategoryProduct } from "../../lib/requests/category-product";
import Breadcrumb from "../../components/elements/breadcrumb";
import HeroCategories from "../../components/blocks/hero/hero_categories";
import GridAside from "../../components/layouts/grid_aside";
import Aside from "../../components/elements/aside";
import { getAllFilters } from "../../lib/requests/product";
import { useProductCategory } from "../../components/hooks/useCategoryProduct";
import SearchForm from "../../components/blocks/form/search-form";
import ProductsGrid from "../../components/blocks/grid/grid-products";


export default function Page({ filters, productCategory }) {
  if (!productCategory) {
    return <ErrorPage statusCode={404} />;
  }
  const breadcrumbs = [
    { id: 1, name: 'Accueil', href: '/' },
    { id: 2, name: 'Produits', href: '/produits' },
    { id: 3, name: productCategory.name, href: `/produits/${productCategory.slug}` }
  ];

  const {
    products,
    pageInfo,
    loading,
    searchTerm,
    setSearchTerm,
    handleSearch,
    loadMoreProducts,
    handleTagChange,
  } = useProductCategory(productCategory);

  const router = useRouter();
  const fullHead = productCategory?.seo ? parse(productCategory.seo.fullHead) : null;

  return (
    <PageLayout preview={null}>
      {router.isFallback ? (
        <PageLoading>Loading…</PageLoading>
      ) : (
        <>
          <Head>{fullHead}</Head>

          <div className="mx-auto max-w-2xl px-4 pt-24 lg:max-w-7xl lg:px-8">
            <Breadcrumb breadcrumbs={breadcrumbs} />

            <HeroCategories
              productCategory={productCategory}
              categories={filters.productCategories}
            />

            <div className="my-4">
              <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
              <GridAside>
                <Aside filters={filters} onTagChange={handleTagChange} />
                <ProductsGrid
                  products={products}
                  pageInfo={pageInfo}
                  loadMoreProducts={loadMoreProducts}
                  loading={loading}
                />
              </GridAside>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getCategoryProduct(params?.slug, null, 12, null, null);
  if (!data?.productCategory || data?.productCategory.slug === "produits") {
    return {
      notFound: true,
    };
  }
  const filters = await getAllFilters();
  return {
    props: {
      productCategory: data.productCategory,
      filters: filters,
    },
    revalidate: 10,
  };
};


export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllProductCategoriesWithSlug();

  return {
    paths: allCategories.edges.map(({ node }) => `/produits/${node.slug}`),
    fallback: true,
  };
};
