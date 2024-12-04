import Link from "next/link";

export default function HeroBackgroundImage({ title, description, link, featuredImage }) {
    const defaultImageUrl = '/images/default-image.png';
    return (
        <section className="block hero_bg_image">
            <div className="relative bg-gray-900 pt-20">
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <img
                        alt={featuredImage?.node?.altText || 'Siege ergonomique'}
                        src={featuredImage?.node?.sourceUrl || defaultImageUrl}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />


                <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
                    {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            Announcing our next round of funding.{' '}
                            <a href="#" className="font-semibold text-white">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div> */}
                    <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">{title}</h1>
                    <p className="mt-4 text-xl text-white">
                        {description}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={link}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                        >
                            Consulter les produits
                        </Link>
                        <a href="#read-more" className="text-sm font-semibold leading-6 text-white">
                            Voir plus <span aria-hidden="true">→</span>
                        </a>
                    </div>
                    {/* <a href={link}
                        className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                        Shop New Arrivals
                    </a> */}
                </div>
            </div>

        </section>
    );
}
