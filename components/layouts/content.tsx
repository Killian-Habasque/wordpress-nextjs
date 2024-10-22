import ComponentAdapter from "../adapters/componentAdapter";

export default function Content({ content }) {
    return (
        <div id="read-more">
            {content && content.map((block, blockIndex) => (
                <ComponentAdapter key={block.__typename + "-" + blockIndex} data={block} typename={block.__typename} />
            ))}
        </div>
    );
}
