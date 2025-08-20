import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import Form from "./Form";
import Modal from "./Modal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // product or null
  const [submitting, setSubmitting] = useState(false);

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

  //Handler functions
  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;
    try {
      await api.delete(`products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id != id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete. Try again.");
    }
  };
  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editing) {
        const { id } = editing;
        const res = await api.put(`/products/${id}`, payload);
        const updated = { ...editing, ...payload, ...(res.data || {}) };
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      } else {
        const res = await api.post(`/products`, payload);
        const newProd =
          res.data && res.data.id ? res.data : { ...payload, id: Date.now() };
        setProducts((prev) => [newProd, ...prev]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Save failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <button onClick={openCreate}>﹢ Add a product</button>
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
                          loading="lazy"
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
                        <button onClick={() => openEdit(p)}>Edit</button>
                        <button onClick={() => handleDelete(p.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      {/* Add/Edit product */}
      <Modal
        open={modalOpen}
        title={editing ? "Edit product" : "Add new product"}
        onClose={() => setModalOpen(false)}
      >
        <Form
          mode={editing ? "edit" : "create"}
          initial={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          categories={categories.filter((c) => c != "All")}
          submitting={submitting}
        />
      </Modal>

      <footer></footer>
    </div>
  );
};

export default ProductDashboard;
