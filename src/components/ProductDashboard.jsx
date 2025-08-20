import { useEffect, useState } from "react";
import api from "../api/api";
import { CATEGORIES } from "../utils/mockData";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

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
      <main>
        <section className="user-inputs flex justify-between">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search By Title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="button-container">
            <button>﹢ Add a product</button>
            <button onClick={() => window.location.reload()}>🔄 Refresh</button>
          </div>
        </section>
        {/* display While loading & error */}
        {loading && <div>Loading...!!!</div>}
        {error && <div>{error}</div>}
        {/* products display using table */}
        <div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td>No products found.</td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-12 w-12 object-contain"
                      />
                      <div>
                        <div className="">{p.title}</div>
                        <div className="">{p.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <div>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default ProductDashboard;
