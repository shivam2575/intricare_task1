import { useState } from "react";
import TextInput from "./reusable/TextInput";
import Select from "./reusable/Select";
import TextArea from "./reusable/TextArea";

const Form = ({
  mode = "create",
  initial,
  categories,
  onSubmit,
  onCancel,
  submitting,
}) => {
  const [formData, setFormData] = useState({
    title: initial?.title ?? "",
    price: initial?.price ?? 0,
    description: initial?.description ?? "",
    category: initial?.category ?? (categories[0] || ""),
    image:
      initial?.image ?? "https://via.placeholder.com/300x300.png?text=Product",
  });
  const update = (patch) => setFormData((prev) => ({ ...prev, ...patch }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, price: Number(formData.price) });
  };
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 bg-amber-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TextInput
          label="Title"
          name="title"
          onChange={update}
          value={formData.title}
          required={true}
        />
        <TextInput
          type="number"
          label="Price"
          name="price"
          onChange={update}
          value={formData.price}
          required={true}
        />
      </div>
      <Select
        label="Category"
        name="category"
        onChange={update}
        options={categories}
        value={formData.category}
        required={true}
      />
      <TextArea
        label="Description"
        name="description"
        onChange={update}
        value={formData.description}
        required={true}
      />
      <TextInput
        label="Image URL"
        name="image"
        onChange={update}
        value={formData.image}
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
          className="px-4 py-2 rounded-xl border bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default Form;
