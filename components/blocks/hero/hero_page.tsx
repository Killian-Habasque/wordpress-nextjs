export default function HeroPage({ title, featuredImage }) {
    const defaultImageUrl = '/images/default-image.png';
    return (
        <div className="relative bg-gray-800 px-6 sm:px-12 py-32 pt-52 lg:px-40">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    alt={featuredImage?.node?.altText || 'Siege ergonomique'}
                    src={featuredImage?.node?.sourceUrl || defaultImageUrl}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
                {/* <p className="mt-3 text-xl text-white">
            We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to
            focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the
            universe.
          </p> */}
            </div>
        </div>
    )
}
