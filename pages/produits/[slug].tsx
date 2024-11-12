import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import parse from "html-react-parser";
import PageLoading from "../../components/pages/loading";
import PageLayout from "../../components/layouts/page_layout";
import { getAllProductCategoriesWithSlug, getProductCategory, refetchProductCategory, refetchProductCategory2 } from "../../lib/requests/categories-product/queries";
import Breadcrumb from "../../components/elements/breadcrumb";
import HeroCategories from "../../components/blocks/hero/hero_categories";
import GridAside from "../../components/layouts/grid_aside";
import Aside from "../../components/elements/aside";
import GridProducts from "../../components/layouts/grid_products";
import { getAllFilters } from "../../lib/requests/product/queries";
import CardProduct from "../../components/blocks/card/card_product";

export default function Page({ filters, productCategory }) {
  const router = useRouter();

  const [products, setProducts] = useState(productCategory?.products?.nodes || []);
  const [pageInfo, setPageInfo] = useState(productCategory?.products?.pageInfo);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const fullHead = productCategory?.seo ? parse(productCategory.seo.fullHead) : null;

  if (!router.isFallback && !productCategory?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const extendedCategories = [
    { node: { slug: "", name: "Tout" } }, 
    ...filters.productCategories.edges,
  ];
  
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = await refetchProductCategory2(productCategory.slug, null, 12, searchTerm, selectedTags.join(","));
    setProducts(data.productCategory.products.nodes);
    setPageInfo(data.productCategory.products.pageInfo);
    setLoading(false);
  };

  const loadMoreProducts = async () => {
    if (!pageInfo.hasNextPage || loading) return;

    setLoading(true);
    const data = await refetchProductCategory2(productCategory.slug, pageInfo.endCursor, 12, searchTerm, selectedTags.join(","));
    setProducts((prev) => [...prev, ...data.productCategory.products.nodes]);
    setPageInfo(data.productCategory.products.pageInfo);
    setLoading(false);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!router.query.slug) return; 
      setLoading(true);
      const data = await refetchProductCategory2(router.query.slug, null, 12, searchTerm, selectedTags.join(","));
      setProducts(data.productCategory.products.nodes);
      setPageInfo(data.productCategory.products.pageInfo);
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [router.query.slug]);

  const executeRefetch = async (tags) => {
    setLoading(true);
    const data = await refetchProductCategory2(
      productCategory.slug, 
      null, 
      12, 
      searchTerm, 
      tags.join(",")
    );
    setProducts(data.productCategory.products.nodes);
    setPageInfo(data.productCategory.products.pageInfo);
    setLoading(false);
  };

  const handleTagChange = (newTag) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(newTag)
        ? prev.filter((tag) => tag !== newTag)
        : [...prev, newTag];
      executeRefetch(newTags);
      return newTags;
    });
  };


  return (
    <PageLayout preview={null}>
      {router.isFallback ? (
        <PageLoading>Loading…</PageLoading>
      ) : (
        <>
          <Head>{fullHead}</Head>

          <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
            <Breadcrumb />
            <HeroCategories
              title={productCategory.name}
              description={productCategory.description}
              categories={{ edges: extendedCategories }}
            />

            <div className="my-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
                >
                  Rechercher
                </button>
              </form>
            </div>

            <GridAside>
              <Aside filters={filters} onTagChange={handleTagChange} />
              <section aria-labelledby="product-heading" className="layout grid_aside mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">
                  Produits
                </h2>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                  {products && products.length > 0 ? (
                    products.map((product) => <CardProduct key={product.id} product={product} />)
                  ) : (
                    <p>Aucun produit trouvé.</p>
                  )}
                </div>
                {pageInfo.hasNextPage && (
                  <div className="text-center mt-8">
                    <button
                      onClick={loadMoreProducts}
                      disabled={loading}
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                      {loading ? "Chargement..." : "Charger plus"}
                    </button>
                  </div>
                )}
              </section>
            </GridAside>
          </div>
        </>
      )}
    </PageLayout>
  );
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getProductCategory(params?.slug, 12);
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
    paths: allCategories.edges.map(({ node }) => `/produits/${node.slug}`) || [],
    fallback: true,
  };
};
