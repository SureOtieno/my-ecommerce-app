import React, { useEffect, useState } from "react";
//import map from lodash

const Products = () => {
  const [products, setProducts] = useState("Loading");
  useEffect(() => {
    fetch("http://localhost:8080/products/") // have a central place for urls
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <div className="products-list">
      <h1 className="font-bold text-2xl p-5">Products</h1>
      <ul>{typeof products}</ul>
    </div>
  );
};

export default Products;
