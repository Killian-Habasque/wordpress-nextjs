import Link from "next/link";

export default function ListPostypes({ text, postypes }) {
    const defaultImageUrl = '/images/default-image.png';
    return (
        <section className="block section-image-texte">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="txt-group" dangerouslySetInnerHTML={{ __html: text }}></div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {postypes?.map(({ id, featuredImage, contentTypeName, slug, title }) => (
                        <div key={id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt={featuredImage?.node?.altText || 'Image'}
                                    src={featuredImage?.node?.sourceUrl || defaultImageUrl}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={`/${contentTypeName}/${slug}`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
