export default function FeaturesLists({ text, listImage, listText }) {

    return (
        <section className="block section-image-texte">
            <div className="bg-white">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div>
                        <div className="txt-group" dangerouslySetInnerHTML={{ __html: text }} />

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
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                        {listImage.map((item, index) => {
                            const image = item.image.node;
                            return (
                                <div key={index} className="w-full h-full relative">
                                    <img
                                        src={image.sourceUrl}
                                        alt={image.altText}
                                        className="aspect-square object-cover w-full h-full rounded-lg bg-gray-100"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}