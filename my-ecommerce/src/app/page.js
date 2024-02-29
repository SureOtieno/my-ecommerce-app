"use client";

import Products from "./products/page";

export default function Home() {
  return (
    <>
      <header className="bg-gray-400 px-4 p-5 font-bold text-lg">
        <p>My go-to links</p>
      </header>
      <div className="products-list">
        <Products />
      </div>
    </>
  );
}
