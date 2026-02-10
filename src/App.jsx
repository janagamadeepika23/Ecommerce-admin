import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";

import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Order/Order";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = "http://localhost:4000";

  return (
    <>
     
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      <hr />

      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add urlprop={url} />} />
          <Route path="/list" element={<List urlprop={url} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
