import axios from "axios";
import { useState } from "react";

const Form = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0.0,
      count: 0,
    },
  });
  const handleFormCancel = () => {
    setFormData({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0.0,
        count: 0,
      },
    });
    setShowForm(false);
  };
  const handleFormAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          price: formData.price,
          description: formData.description,
          category: formData.category,
          image: formData.image,
          rating: {
            rate: formData.rating.rate,
            count: formData.rating.count,
          },
        }),
      });
      const newData = await res.data;
      //update products;
      setProducts([newData, ...products]);
      //reset Form
      setFormData({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: {
          rate: 0.0,
          count: 0,
        },
      });
    } catch (error) {
      console.error(`Error adding products: ${error.message}`);
    }
  };
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Add Product Details
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                for="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  type="text"
                  name="title"
                  autocomplete="given-title"
                  value={formData.title}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                for="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  type="number"
                  name="price"
                  autocomplete="price"
                  value={formData.price}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="image"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  type="text"
                  name="image"
                  autocomplete="image"
                  value={formData.image}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                for="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  type="text"
                  name="category"
                  autocomplete="category"
                  value={formData.category}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                for="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  type="textarea"
                  name="description"
                  autocomplete="description"
                  value={formData.description}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                for="rating_rate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Rating's rate
              </label>
              <div className="mt-2">
                <input
                  id="rating_rate"
                  type="number"
                  step={0.1}
                  name="rating_rate"
                  autocomplete="rating_rate"
                  value={formData.rating.rate}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                for="rating_count"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Rating's count
              </label>
              <div className="mt-2">
                <input
                  id="rating_count"
                  type="number"
                  name="rating_count"
                  autocomplete="rating_count"
                  value={formData.rating.count}
                  onChange={handleFormDataChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={handleFormCancel}
          type="button"
          className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleFormAdd}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
