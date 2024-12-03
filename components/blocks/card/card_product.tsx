import Image from "next/image";
import Link from "next/link";

export default function CardProduct({ product }) {
    return (
        <div className="block card_product">
            {/* <Link href={`/produits/${product.uri}`}> */}
            <div
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <Image
                        width={280}
                        height={320}
                        alt={product.featuredImage.node.imageAlt ?? "Siege ergonomique"}
                        src={product.featuredImage.node.sourceUrl}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <a href={product.uri}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}
                        </a>
                    </h3>
                    {product.products?.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">{product.products?.description}</p>
                    )}
                    {product.products?.price && (
                        <div className="flex flex-1 flex-col justify-end">
                            <p className="text-base font-medium text-gray-900">{product.products?.price} €</p>
                        </div>
                    )}

                </div>
            </div>
            {/* </Link> */}
        </div>
    );
}
