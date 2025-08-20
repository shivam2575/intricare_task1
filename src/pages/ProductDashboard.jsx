import { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import Form from "../components/Form";
import Modal from "../components/Modal";

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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/80 backdrop-blur z-40 sticky top-0">
        <div className="flex justify-between items-center p-4 mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold">
            🛍️ Product Management Dashboard
          </h1>
          <div className="text-xs text-gray-500">Fake Store API</div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="grid gap-3 mb-4 md:flex md:justify-between md:items-center">
          <div className="flex gap-2 items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search By Title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-xl md:80 border p-2 outline-none focus:ring focus:ring-indigo-200"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200 bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={openCreate}
            >
              ﹢ Add product
            </button>
            <button
              className="px-3 py-2 rounded-xl border hover:bg-gray-50"
              onClick={() => window.location.reload()}
            >
              🔄 Refresh
            </button>
          </div>
        </section>
        {/* display While loading & error */}
        {loading && (
          <div className="grid place-items-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full" />
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}
        {/* products display using table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3 w-24">Price</th>
                  <th className="text-left p-3 w-48">Category</th>
                  <th className="text-left p-3 w-40">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-12 w-12 object-contain bg-white rounded-lg border"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium line-clamp-2">
                            {p.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">${Number(p.price).toFixed(2)}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                          onClick={() => openEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 rounded-lg border text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(p.id)}
                        >
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
    </div>
  );
};

export default ProductDashboard;
