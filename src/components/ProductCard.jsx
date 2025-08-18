const ProductCard = ({ product }) => {
  const { title, image, price, rating, category } = product;
  return (
    <div className="flex flex-col m-2 h-96 w-56 border border-black rounded-lg shadow-lg bg-blue-200 transition duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-300 hover:scale-110 cursor-pointer overflow-hidden">
      <div className="h-[55%] w-full bg-gray-100 p-2 rounded-t-lg">
        <img className="h-full w-full object-contain" src={image} alt={title} />
      </div>
      <div className="h-[40%] m-2 p-2">
        <p className="font-bold">{title}</p>
        <p>₹{price}</p>
        <p>⭐️{rating.rate}</p>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
