import Content from "./layouts/content";

export default function Products({ products }) {
    return (
        <>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h1>{product.title}</h1>
                    <Content content={product.blocks.content} />
                </div>
            ))}
        </>
    );
}
