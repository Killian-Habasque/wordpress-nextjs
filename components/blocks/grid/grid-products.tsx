import CardProduct from "../card/card_product";

export default function ProductsGrid({ products, pageInfo, loadMoreProducts, loading }) {
    return (
        <section aria-labelledby="product-heading" className="layout grid_aside mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
            <h2 id="product-heading" className="sr-only">Produits</h2>

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
    );
}
