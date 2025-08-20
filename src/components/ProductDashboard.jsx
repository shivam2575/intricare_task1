import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import Form from "./Form";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // fetch products + categories on mount
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.get("/products"),
          api.get("/products/categories").catch(() => ({ data: categories })),
        ]);
        if (!ignore) {
          setProducts(prodRes.data || []);
          setCategories(["All", ...(catRes.data || [])]);
          setError("");
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setError("Failed to load products. Please retry.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = q ? p.title.toLowerCase().includes(q) : true;
      const matchesCategory =
        category === "All" ? true : p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

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
              {categories.map((category) => (
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
        {!loading && !error && (
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
                {filtered.length === 0 && (
                  <tr>
                    <td>No products found.</td>
                  </tr>
                )}
                {filtered.map((p) => (
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
                    <td className="p-3">${Number(p.price).toFixed(2)}</td>
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
        )}
      </main>
      <Form />
      <footer></footer>
    </div>
  );
};

export default ProductDashboard;
