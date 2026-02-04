"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

import { FaMoneyBillWave } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    alert("Order success! Payment with Cash on Delivery.");

    clearCart();
    router.push("/");
  };

  if (!user)
    return (
      <p className="mt-20 text-center text-3xl text-red-500">
        Please login first
      </p>
    );

  return (
    <main className="grid py-4 lg:grid-cols-[2fr_1fr] lg:items-start lg:gap-4">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Contact Information */}
        <div className="space-y-4 rounded-lg border border-white/15 bg-[#1a1a1a] p-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="fullname" className="">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  disabled
                  value={user.fullName}
                  className="w/ rounded-lg bg-black py-1 pl-4"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  value={user.email}
                  className="w/ rounded-lg bg-black py-1 pl-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                disabled
                value={user.phone}
                className="w/ rounded-lg bg-black py-1 pl-4"
              />
            </div>
          </div>
        </div>
        {/* ./Contact Information */}

        {/* payment method */}
        <div className="space-y-4 rounded-lg border border-white/15 bg-[#1a1a1a] p-4">
          <h3 className="">Payment Method</h3>
          <button
            disabled
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border-2 border-gray-400 bg-[#0a0a0a] px-4 py-2"
          >
            <FaMoneyBillWave className="size-5 text-white" />{" "}
            <span className="font-semibold text-white">Cash on Delivery</span>
          </button>
        </div>
        {/* ./ payment method */}
      </section>

      {/* order summary */}
      <section className="mt-4 space-y-4 rounded-lg border border-white/15 bg-[#1a1a1a] p-4 lg:w-96">
        <h3 className="">Order Summary</h3>

        <div className="max-h-96 overflow-y-scroll">
          {/* item cart */}
          {cart.length === 0 && <p className="p-4">Cart Empty</p>}

          {cart.map((item) => {
            return (
              <div
                className="flex items-center justify-between border-t border-b border-white/15 p-4"
                key={item.id}
              >
                <div className="flex w-full items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mx-auto aspect-square w-16 rounded-lg bg-gray-500 object-cover object-top"
                  />

                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="space-y-2">
                      <p className="line-clamp-1 text-sm">{item.title}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>

                    <p className="text-sm font-semibold">${item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* ./ item cart */}
        </div>

        {/* total price item */}
        <div className="space-y-4 border-t-2 border-white/15 pt-4">
          <div className="flex items-center justify-between">
            <p className="">Total</p>
            <p className="">${totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] p-2"
          >
            Place Order <FaArrowRightLong />
          </button>
        </div>
        {/* ./ total price item */}
      </section>
      {/* ./order summary */}
    </main>
  );
}
