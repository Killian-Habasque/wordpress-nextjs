import Image from "next/image";

export default function ListFeatures({ text, listImage, listText, direction }) {
    const imageOrderClass = direction ? "lg:order-first" : "lg:order-last";
    const textOrderClass = direction ? "lg:order-last" : "lg:order-first";

    return (
        <section className="block section-image-texte">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div className={`${textOrderClass}`}>
                    <div className={`txt-group ${textOrderClass}`} dangerouslySetInnerHTML={{ __html: text }} />

                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {listText.map((item, index) => {
                            const text = item.text;
                            return (
                                <div key={index} className="border-t border-gray-200 pt-4">
                                    <dd className="mt-2 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: text }}></dd>
                                </div>
                            );
                        })}
                    </dl>
                </div>
                <div className={`grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 ${imageOrderClass}`}>
                    {listImage.map((item, index) => {
                        const image = item.image.node;
                        return (
                            <div key={index} className="relative w-full h-0 pb-[100%]">
                                <Image
                                    width={300}
                                    height={300}
                                    src={image.sourceUrl}
                                    alt={image.altText}
                                    className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
