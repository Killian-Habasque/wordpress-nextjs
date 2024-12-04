import Link from "next/link";

export default function Categories({ categories }) {
  return (
    categories && categories.length > 0 ? (
      <nav className="flex flex-wrap gap-2 mt-4">
        {categories.map((category, index) => {
          const href = category.node.slug === 'produits'
            ? '/produits'
            : `/produits/${category.node.slug}`;
          return (
            <Link
              key={index}
              className={`py-2 px-3 text-sm font-medium rounded-full ${
                category.current
                  ? "bg-indigo-400 text-white"
                  : "bg-indigo-600 text-white hover:bg-indigo-400"
              }`}
              href={href}
            >
              {category.node.name}
            </Link>
          );
        })}
      </nav>
    ) : null
  );
}
