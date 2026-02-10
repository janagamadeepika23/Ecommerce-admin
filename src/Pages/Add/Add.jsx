import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import "./Add.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const url = "http://localhost:4000";

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    productName: "",
    company: "",
    model: "",          // ✅ model
    brand: "",
    description: "",
    price: "",
    category: "Body Lotion",
  });

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Please upload an image");

    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("company", data.company);
      formData.append("model", data.model);      // ✅ model
      formData.append("brand", data.brand);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(
        `${url}/api/product/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("Product Added Successfully");

        setData({
          productName: "",
          company: "",
          model: "",
          brand: "",
          description: "",
          price: "",
          category: "Body Lotion",
        });
        setImage(null);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again!");
    }
  };

  return (
    <div className="add">
      <ToastContainer />
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* Image Upload */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="productName"
            value={data.productName}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Company */}
        <div className="add-product-name flex-col">
          <p>Company</p>
          <input
            type="text"
            name="company"
            value={data.company}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Model */}
        <div className="add-product-name flex-col">
          <p>Model</p>
          <input
            type="text"
            name="model"
            value={data.model}
            onChange={onChangeHandler}
            placeholder="Model name"
            required
          />
        </div>

        {/* Brand */}
        {/* <div className="add-product-name flex-col">
          <p>Brand</p>
          <input
            type="text"
            name="brand"
            value={data.brand}
            onChange={onChangeHandler}
            placeholder="Brand name"
            required
          />
        </div> */}

        {/* Description */}
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            name="description"
            rows="6"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Category & Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Watches">Watches</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Computers">Computers</option>
              <option value="Mens Wear">Mens Wear</option>
              <option value="Womens Wear">Womens Wear</option>
              <option value="Wallet">Wallet</option>
              <option value="Toys">Toys</option>
              <option value="Books">Books</option>
              <option value="Furniture">Furniture</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Body Lotion">Body Lotion</option>
              <option value="Makeup">Makeup</option>
              <option value="Footwear">Footwear</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Kidswear">Kidswear</option>
              <option value="Sarees">Sarees</option>
              <option value="Bags">Bags</option>
              <option value="Home decor">Home decor</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="₹200"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
