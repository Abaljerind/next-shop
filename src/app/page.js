"use client";

import { useEffect, useMemo, useState } from "react";

import { TbCategory } from "react-icons/tb";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(`Fetch error: ${err.message}`);
      } finally {
        console.log("Fetching data finish.");
      }
    }

    fetchProducts();
  }, []);

  // for filter data based on category
  const productByCategory = useMemo(() => {
    if (selectCategory === "All") return products;

    return products.filter((product) => product.category === selectCategory);
  }, [selectCategory, products]);

  // for handling category active
  const handleCategory = (category) => {
    setSelectCategory(category);
  };

  // get all category from products
  const categoriesProducts = useMemo(() => {
    if (products.length === 0) return [];

    return [
      "All",
      ...new Set(
        products.map((product) => {
          return product.category;
        }),
      ),
    ];
  }, [products]);

  // copy and add new category "All"

  return (
    <main className="flex w-full max-w-7xl flex-col items-center gap-4 py-4 lg:flex-row-reverse lg:items-start lg:gap-6">
      {/* list category */}
      <section className="w-full space-y-4 rounded-xl border border-white/15 py-4 md:w-11/12 lg:w-96">
        <p className="flex items-center gap-2 pl-2 text-lg font-semibold tracking-wider">
          <TbCategory className="size-6 text-purple-500" /> Categories:
        </p>
        <div className="grid gap-4">
          {categoriesProducts.map((category) => {
            const bigCategory =
              category.charAt(0).toUpperCase() + category.slice(1);
            return (
              <ul
                className={`${selectCategory === category ? "border-l-2 border-purple-500 pl-1" : ""} cursor-pointer bg-linear-to-r from-white/5 to-[#0a0a0a] py-2 pl-2 tracking-wider`}
                key={category}
              >
                <li className="" onClick={() => handleCategory(category)}>
                  {bigCategory}
                </li>
              </ul>
            );
          })}
        </div>
      </section>
      {/* ./ list category */}

      {/* product list */}
      <section className="grid w-full items-stretch gap-4 p-4 md:grid-cols-2 md:gap-6 lg:p-0 xl:grid-cols-3">
        {productByCategory.map((product) => {
          const bigCategory =
            product.category.charAt(0).toUpperCase() +
            product.category.slice(1);
          return (
            <div
              className="flex h-full flex-col justify-between rounded-xl border border-white/15 p-4 font-medium text-black"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.category}
                className="mx-auto aspect-[3/4] w-full rounded-lg bg-gray-500 object-cover object-top"
              />
              <div className="mt-4 flex flex-col gap-4">
                <h3 className="line-clamp-1 font-medium text-white lg:text-lg">
                  {product.title}
                </h3>
                <span className="w-fit rounded-full border border-white/15 bg-[#1a1a1a] px-4 py-2 text-xs font-semibold tracking-wide text-white">
                  {bigCategory}
                </span>
                <div className="mt-4 flex items-center justify-between">
                  <div className="">
                    <span className="text-xs text-gray-400 lg:text-sm">
                      Price
                    </span>
                    <p className="text-white lg:text-lg">${product.price}</p>
                  </div>
                  <button className="cursor-pointer rounded-lg bg-purple-700 px-6 py-1.5 font-medium tracking-wider text-white">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      {/* ./ product list */}
    </main>
  );
}
