import { useState } from "react";
import Select from "./reusable/Select";
import TextArea from "./reusable/TextArea";
import TextInput from "./reusable/TextInput";

export default function ProductForm({
  mode = "create",
  initial,
  categories,
  onSubmit,
  onCancel,
  submitting,
}) {
  const [data, setData] = useState(() => ({
    title: initial?.title ?? "",
    price: initial?.price ?? 0,
    description: initial?.description ?? "",
    category: initial?.category ?? (categories[0] || ""),
    image:
      initial?.image ?? "https://via.placeholder.com/300x300.png?text=Product",
  }));

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const handleSubmit = (e) => {
    e.preventDefault(); //WHY THIS?
    onSubmit({ ...data, price: Number(data.price) });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TextInput
          label="Title"
          name="title"
          value={data.title}
          onChange={update}
          required
        />
        <TextInput
          label="Price"
          type="number"
          name="price"
          value={data.price}
          onChange={update}
          required
        />
      </div>
      <Select
        label="Category"
        name="category"
        value={data.category}
        options={categories}
        onChange={update}
        required
      />
      <TextArea
        label="Description"
        name="description"
        value={data.description}
        onChange={update}
        required
      />
      <TextInput
        label="Image URL"
        name="image"
        value={data.image}
        onChange={update}
      />

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
