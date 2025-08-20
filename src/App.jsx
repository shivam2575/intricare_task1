import { useEffect, useState } from "react";
import ProductContainer from "./components/ProductContainer";
import FormContainer from "./components/FormContainer";
import api from "./api/api";
import ProductDashboard from "./components/ProductDashboard";

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
  return <ProductDashboard />;
}

export default App;
