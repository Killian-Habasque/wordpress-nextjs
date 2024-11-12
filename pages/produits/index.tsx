import { GetStaticProps } from 'next'
import { getAllFilters, getAllProducts } from '../../lib/requests/product/queries'
import GridAside from '../../components/layouts/grid_aside'
import GridProducts from '../../components/layouts/grid_products'
import Breadcrumb from '../../components/elements/breadcrumb'
import Aside from '../../components/elements/aside'
import HeroCategories from '../../components/blocks/hero/hero_categories'
import PageLayout from '../../components/layouts/page_layout'


const datapage = {
  title: 'Produits',
  description: 'Checkout out the latest release of Basic Tees, new and improved with four openings!',
}

export default function Products({ products, filters }) {

  const extendedCategories = [
    { node: { slug: "", name: "Tout" } }, 
    ...filters.productCategories.edges,
  ];
  
  return (
    <PageLayout preview={null}>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <Breadcrumb />
        <HeroCategories title={datapage.title} description={datapage.description} categories={{ edges: extendedCategories }} />
        <GridAside>
          <Aside filters={filters} />
          <GridProducts items={products} />
        </GridAside>
      </div>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts();
  const filters = await getAllFilters();

  return {
    props: {
      products: data.nodes,
      filters: filters
    },
    revalidate: 10,
  };
};