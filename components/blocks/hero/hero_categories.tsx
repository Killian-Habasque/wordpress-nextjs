import Categories from "../../elements/categories";

export default function HeroCategories({ productCategory, categories }) {
  return (
    <div className="border-b border-gray-200 pb-10 pt-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{productCategory.name}</h1>
      <p className="mt-4 text-base text-gray-500">
        {productCategory.description}
      </p>
      {categories && (
        <Categories
          categories={categories.edges.map(category => ({
            ...category,
            current: productCategory.slug === "produits" && category.node.slug === "" || category.node.slug === productCategory.slug
          }))}
        />
      )}
    </div>

  )
}

