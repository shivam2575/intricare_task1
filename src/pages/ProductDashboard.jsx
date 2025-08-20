import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

import ProductForm from "../components/Form";
import Modal from "../components/Modal";

export default function ProductDashboard() {
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

  // Fetch products + categories on mount
  useEffect(() => {
    let ignore = false; //WHY THIS?
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived view
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = q ? p.title.toLowerCase().includes(q) : true;
      const matchesCategory =
        category === "All" ? true : p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  // Handlers
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
      await api.delete(`/products/${id}`);
      // Optimistic UI: remove locally
      setProducts((ps) => ps.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Try again.");
    }
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editing) {
        const { id } = editing;
        const res = await api.put(`/products/${id}`, payload);
        const updated = { ...editing, ...payload, ...(res.data || {}) }; //WHY THIS?
        setProducts((ps) => ps.map((p) => (p.id === id ? updated : p)));
      } else {
        const res = await api.post("/products", payload);
        const created =
          res.data && res.data.id ? res.data : { ...payload, id: Date.now() };
        setProducts((ps) => [created, ...ps]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Save failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            🛍️ Product Management Dashboard
          </h1>
          <div className="text-xs text-gray-500">Fake Store API</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-4 grid gap-3 md:flex md:items-center md:justify-between">
          <div className="flex gap-2 items-center w-full md:w-auto">
            <input
              placeholder="Search by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 md:w-80 rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200"
            />
            <select
              className="rounded-xl border p-2 outline-none focus:ring focus:ring-indigo-200 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
            >
              + Add Product
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-2 rounded-xl border hover:bg-gray-50"
              title="Refresh from API"
            >
              ⟳ Refresh
            </button>
          </div>
        </section>

        {/* Data States */}
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

        {/* Table */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3 w-24">Price</th>
                  <th className="text-left p-3 w-48">Category</th>
                  <th className="text-right p-3 w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-gray-500" colSpan={4}>
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
                          onClick={() => openEdit(p)}
                          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1.5 rounded-lg border text-red-600 hover:bg-red-50"
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

      {/* Modal: Add/Edit */}
      <Modal
        open={modalOpen}
        title={editing ? "Edit Product" : "Add Product"}
        onClose={() => setModalOpen(false)}
      >
        <ProductForm
          mode={editing ? "edit" : "create"}
          initial={editing || undefined}
          categories={categories.filter((c) => c !== "All")}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
}
