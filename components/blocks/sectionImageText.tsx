export default function SectionImageText({ text, image, direction }) {
  const imageOrderClass = direction ?  "lg:order-first" : "lg:order-last";
  const textOrderClass = direction ?  "lg:order-last" : "lg:order-first";

  return (
    <section className="block section-image-texte">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className={`img-group relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full ${imageOrderClass}`}>
            <img
              alt={ image.node.altText }
              src={ image.node.sourceUrl }
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className={`txt-group lg:py-24 ${textOrderClass}`} dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
      </div>
    </section>
  );
}
