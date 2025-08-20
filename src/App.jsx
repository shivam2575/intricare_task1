import { useEffect, useState } from "react";
import ProductContainer from "./components/ProductContainer";
import FormContainer from "./components/FormContainer";
import api from "./api/api";

function App() {
  const [products, setProducts] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fetchData = async () => {
    try {
      const response = await api({
        url: "/products",
        method: "get",
      });
      if (response.status !== 200) throw new Error(`Error: ${response.status}`);
      const data = response.data;
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="border border-black rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🛍️ Product Management Dashboard
          </h1>
          <div className="text-xs text-gray-500">Fake Store API</div>
        </div>
      </header>
      <main></main>
      <footer></footer>
      <button
        onClick={() => setShowForm(!showForm)}
        className="p-2 cursor-pointer border rounded-lg shadow-lg m-2 bg-blue-200 hover:bg-blue-300 border-black"
      >
        Add a product
      </button>
      {showForm && <FormContainer setShowForm={setShowForm} />}
      <ProductContainer products={products} />
    </div>
  );
}

export default App;
