import { useState } from "react";
import ProductContainer from "./components/ProductContainer";
import { PRODUCTS } from "./utils/mockData";
import FormContainer from "./components/FormContainer";

function App() {
  const [products, setProducts] = useState([...PRODUCTS]);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => setShowForm(!showForm)}
        className="p-2 cursor-pointer border rounded-lg shadow-lg m-2 bg-blue-200 hover:bg-blue-300 border-black"
      >
        Add a product
      </button>
      {showForm && <FormContainer />}
      <ProductContainer products={products} />
    </div>
  );
}

export default App;
