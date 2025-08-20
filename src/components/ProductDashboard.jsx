import { useEffect, useState } from "react";
import api from "../api/api";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="border border-black rounded-lg shadow-lg sticky top-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🛍️ Product Management Dashboard
          </h1>
          <div className="text-xs text-gray-500">Fake Store API</div>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
};

export default ProductDashboard;
