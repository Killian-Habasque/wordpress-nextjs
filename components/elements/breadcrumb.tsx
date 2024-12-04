import Link from "next/link";

interface BreadcrumbItem {
  id: number;
  name: string;
  href: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
}

export default function Breadcrumb({ breadcrumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl">
      <ol role="list" className="flex items-center space-x-4 py-4">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.id}>
            <div className="flex items-center">
              <Link
                href={breadcrumb.href ?? null}
                className={`mr-4 text-sm font-medium ${
                  index === breadcrumbs.length - 1 ? "text-gray-500" : "text-gray-900"
                }`}
              >
                {breadcrumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
