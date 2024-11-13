import { GetStaticProps } from 'next'
import { getAllFilters } from '../../lib/requests/product/queries'
import GridAside from '../../components/layouts/grid_aside'
import GridProducts from '../../components/layouts/grid_products'
import Breadcrumb from '../../components/elements/breadcrumb'
import Aside from '../../components/elements/aside'
import HeroCategories from '../../components/blocks/hero/hero_categories'
import PageLayout from '../../components/layouts/page_layout'
import { useProductCategory } from '../../components/hooks/useCategoryProduct'
import { getProducts, refetchProductCategory } from '../../lib/requests/categories-product/queries'
import CardProduct from '../../components/blocks/card/card_product'
import Head from 'next/head'



const fetchAndUpdateProducts = async ({
  slug,
  cursor = null,
  searchTerm = "",
  tags = [],
  setProducts,
  setPageInfo,
  setLoading,
}) => {
  setLoading(true);
  try {
    const data = await getProducts(cursor, 12, searchTerm, tags.join(","));
    setProducts((prev) => (cursor ? [...prev, ...data.products.nodes] : data.products.nodes));
    setPageInfo(data.products.pageInfo);
  } finally {
    setLoading(false);
  }
};

export default function Products({ initialProducts, filters }) {
  const initialCategory = {
    title: 'Produits',
    name: 'Produits',
    slug: "",
    description: 'Checkout out the latest release of Basic Tees, new and improved with four openings!',
    products: initialProducts
  }

  const {
    products,
    pageInfo,
    loading,
    searchTerm,
    setSearchTerm,
    handleSearch,
    loadMoreProducts,
    handleTagChange,
  } = useProductCategory(initialCategory, fetchAndUpdateProducts);

  return (
    <PageLayout preview={null}>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <Head>
          <title>{initialCategory.title}</title>
        </Head>
        <Breadcrumb />
        <HeroCategories title={initialCategory.title} description={initialCategory.description} categories={filters.productCategories} />

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
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getProducts(null, 12, null, null);
  const filters = await getAllFilters();

  return {
    props: {
      initialProducts: data.products,
      filters: filters
    },
    revalidate: 10,
  };
};