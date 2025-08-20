import axios from "axios";
import { useState } from "react";
import TextInput from "./reusable/TextInput";
import { CATEGORIES } from "../utils/mockData";
import Select from "./reusable/Select";

const Form = ({}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
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
  const handleSubmit = async (e) => {
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
    <form onSubmit={handleSubmit}>
      <div className="">
        <TextInput
          type="text"
          label="Title"
          name="title"
          value={formData.title}
          required={true}
        />
        <TextInput
          type="number"
          label="Price"
          name="price"
          value={formData.price}
          required={true}
        />
      </div>
      <Select
        label="Category"
        name="category"
        value={formData.category}
        required={true}
      />
      <TextArea />
      <div>
        <button>cancel</button>
        <button>submit</button>
      </div>
    </form>
  );
};

export default Form;
