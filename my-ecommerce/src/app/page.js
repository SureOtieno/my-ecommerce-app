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
      {/* <div className="p-5">
        <h1 className="font-bold text-lg text-green-600 px-3 py-4">
          Product Categories
        </h1>
        <div className="bg-lavender-100 ">
          <h2 className="text-lg">Phones</h2>
          <div className="py-4">
            <div className="w-64">
              <div className="bg-blue-100 p-5 rounded-xl">
                <img src="Products/Gadgets/iPhone11.jpg" alt="" />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-lg ">iPhone 11</h3>
              </div>
              <p className="text-sm mt-2 leading-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex mt-2 p-1">
                <div className="font-bold text-2xl grow">$999</div>
                <button className="bg-indigo-400 text-white px-3 py-1 p-2 rounded-xl">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
