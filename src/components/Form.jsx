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
    <form onSubmit={handleSubmit} className="bg-amber-300">
      <div className="">
        <TextInput
          type="text"
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
      <div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default Form;
