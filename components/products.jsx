export default function Products({ products }) {
    console.log(products);
    return (
        <>
            {products && products.map((product, index) => (
                <h1 key={index}>{product.title}</h1>
                
            ))}
        </>
    );
}