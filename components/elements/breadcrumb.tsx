

const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]

export default function Breadcrumb() {
    return (
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl pt-24">
            <ol role="list" className="flex items-center space-x-4 py-4">
                {breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                        <div className="flex items-center">
                            <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                                {breadcrumb.name}
                            </a>
                            <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                                <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                            </svg>
                        </div>
                    </li>
                ))}
                <li className="text-sm">
                    <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                        New Arrivals
                    </a>
                </li>
            </ol>
        </nav>
    );
}
