import { useState } from "react";

const Form = () => {
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
  };
  const handleFormAdd = () => {};
  return (
    <form>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">
            Add Product Details
          </h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="title"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Title
              </label>
              <div class="mt-2">
                <input
                  id="title"
                  type="text"
                  name="title"
                  autocomplete="given-title"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="price"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Price
              </label>
              <div class="mt-2">
                <input
                  id="price"
                  type="number"
                  name="price"
                  autocomplete="price"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="image"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Image URL
              </label>
              <div class="mt-2">
                <input
                  id="image"
                  type="text"
                  name="image"
                  autocomplete="image"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label
                for="category"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Category
              </label>
              <div class="mt-2">
                <input
                  id="category"
                  type="text"
                  name="category"
                  autocomplete="category"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="description"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div class="mt-2">
                <input
                  id="description"
                  type="textarea"
                  name="description"
                  autocomplete="description"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label
                for="rating_rate"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Rating's rate
              </label>
              <div class="mt-2">
                <input
                  id="rating_rate"
                  type="number"
                  step={0.1}
                  name="rating_rate"
                  autocomplete="rating_rate"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="rating_count"
                class="block text-sm/6 font-medium text-gray-900"
              >
                Rating's count
              </label>
              <div class="mt-2">
                <input
                  id="rating_count"
                  type="text"
                  name="rating_count"
                  autocomplete="rating_count"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={handleFormCancel}
          type="button"
          class="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleFormAdd}
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
