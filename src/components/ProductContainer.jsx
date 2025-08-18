import ProductCard from "./ProductCard";

const ProductContainer = ({ products }) => {
  console.log(products);
  return (
    <div className="flex flex-wrap">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductContainer;
