export default function SectionText({ text }) {
    return (
        <section className="block section-image-texte">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="txt-group" dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </section>
    );
}
