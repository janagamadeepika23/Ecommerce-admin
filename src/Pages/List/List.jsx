import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = () => {
  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  // Fetch all products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  // Delete product
  const removeProduct = async (productId) => {
    try {
      const response = await axios.delete(`${url}/api/del`, {
        data: { id: productId },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh list
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Products List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            No products found
          </p>
        ) : (
          list.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p
                className="cursor"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this product?"
                    )
                  ) {
                    removeProduct(item._id);
                  }
                }}
              >
                X
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
