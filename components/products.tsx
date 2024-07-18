import ComponentAdapter from "./adapters/componentAdapter";

export default function Products({ products }) {
    // console.log(products);
    return (
        <>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h1>{product.title}</h1>
                    {product.blocks.content && product.blocks.content.map((block, blockIndex) => (
                        <ComponentAdapter key={block.__typename + "-" + blockIndex} data={block} component={block.__typename} />
                    ))}
                </div>
            ))}
        </>
    );
}
