import React, { useEffect, useState } from "react";
import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

import PaymentButton from "./PaymentButton";
import Map from "./Map";

const CheckoutPage = () => {
  const [tot, setTot] = useState(0);

  // const { cartItems } = useStateValue();
  const CartCheckoutItems = fetchCart();
  const user = fetchUser();
  const [order, setOrder] = useState({
    ...CartCheckoutItems,
    addressLatLng: null,
    name: null,
    email: null,
    contact: null,
    id: null,
    orderStatus: "pending",
  }); // Initialize addressLatLng as null

  useEffect(() => {
    let totalPrice = 0;
    let itemsInCart = JSON.parse(localStorage.getItem("cartItems"));

    itemsInCart.map((itm) => {
      totalPrice = totalPrice + itm.qty * itm.price;
    });
    setTot(totalPrice);
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <>
      <div className="flex flex-col items-center  border-b bg-white py-2 sm:flex-row sm:px-10 lg:px-20 xl:px-32  ">
        <a href="/" className="text-2xl font-bold text-gray-800">
          Foodiez
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 grid-cols-1 lg:grid-cols-2  lg:px-20 xl:px-32 sm:w-full">
        <div className="px-4 pt-8">
          <div className="mt-1 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {CartCheckoutItems.map((item) => (
              <div
                key={item.id}
                className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
              >
                <img
                  className="w-50 h-20  rounded-full object-contain"
                  src={item.imageURL}
                  alt=""
                />
                <div className="flex flex-col gap-2">
                  <div className="text-base text-gray-50">{item?.title}</div>
                  <div className="text-sm block text-gray-300 font-semibold">
                    $ {item?.price * item.qty}
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full flex-1 bg-cartTotal  flex flex-col items-center justify-evenly px-10 py-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Sub Total</p>

                <p className="text-gray-400 text-lg">${tot}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Delivery</p>
                <p className="text-gray-400 text-lg">$2.5</p>
              </div>
              <div className="w-full border-b border-gray-600 my-2"></div>
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-200 text-xl font-semibold">Total</p>
                <p className="text-gray-200 text-xl font-semibold">
                  ${tot + 2.5}
                </p>
              </div>

              <PaymentButton amount={tot + 2.5} order={order} />
            </div>
          </div>
        </div>

        <div className="mt-10  px-4 pt-8 lg:mt-0">
          {/* <MapContainer /> */}

          <div className=" md:flex md:items-center md:justify-center">
            <p title="Choose Your Location" fontSize="1.6rem" />

            <Map
              location={order.addressLatLng}
              onChange={(latlng) => {
                if (latlng) {
                  // Update order state with new addressLatLng
                  setOrder((prevOrder) => ({
                    ...prevOrder,
                    addressLatLng: latlng,
                    name: user.displayName,
                    email: user.email,
                    contact: user.phoneNumber || "9000090000",
                    id: `${Date.now()}`,
                    orderStatus: "pending",
                  }));

                  // Save order data to Firebase after state update
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
