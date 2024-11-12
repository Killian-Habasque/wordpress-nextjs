import Link from "next/link";

export default function Categories({ categories }) {
  return (
    categories && categories.edges && categories.edges.length > 0 ? (
      <nav className="flex flex-wrap gap-2 mt-4">
        {categories.edges.map((category, index) => (
          <Link
            key={index}
            className="bg-indigo-600 text-white py-1 px-3 rounded-full text-sm"
            href={`/produits/${category.node.slug}`}
          >
            {category.node.name}
          </Link>
        ))}
      </nav>
    ) : null
  );
}
