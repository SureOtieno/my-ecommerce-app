"use client";

import React, { useEffect, useState } from "react";
import map from "lodash/map";

import API_ROUTES from "../my_apiConfigs";

const Products = () => {
  const [products, setProducts] = useState("Loading");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const Response = await fetch(API_ROUTES.fetchProducts); // have a central place for urls
    await Response.json()
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log("Error fetching the data: ", err);
      });
  };

  const handleEdit = async () => {};

  return (
    <div className="bg-vanilla">
      <h1 className="font-bold p-5 text-2xl px-10">Product List</h1>
      <div className="p-3 bg-indigo-400 text-white px-3 py-1 p-2 rounded-xl w-64">
        <a href="">Create new</a>
      </div>

      <div className="grid w-64 px-3 py-1">
        {map(products, (product) => (
          <div className="p-5 bg-blue-100 p-5 rounded-xl" key={product.id}>
            <img src={product.productImage} />
            <div className="card-body">
              <h3 className="">Name: {product.name}</h3>
              <p className="p-3">Description: {product.description}</p>
              <div className="flex mt-2 p-1">
                <div className="font-bold text-xl grow">
                  Price: ${product.price}
                </div>
                <div>
                  <button className="bg-indigo-400 text-white px-3 py-1 p-2 rounded-xl">
                    +
                  </button>
                </div>
                <div>
                  <button className="bg-indigo-400 text-white px-3 py-1 p-2 rounded-xl">
                    Edit
                  </button>
                </div>
                <div>
                  <button className="bg-red-400 text-white px-3 py-1 p-2 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
