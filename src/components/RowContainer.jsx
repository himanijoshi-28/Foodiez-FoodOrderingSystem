import React, { useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = (item) => {
    const existingItemIndex = cartItems.findIndex((itm) => itm.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].qty += 1;
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: updatedCartItems,
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...item, qty: 1 }];
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: updatedCartItems,
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex items-center scroll scroll-smooth gap-3  ${
        flag
          ? "overflow-x-scroll  scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => {
          return (
            <div
              key={item.id}
              className="w-275 md:w-300 h-[175px] min-w-[275px] md:min-w-[300px]   my-12 bg-cardOverlay rounded-lg p-2 px-4  backdrop-blur-2xl hover:drop-shadow-lg flex flex-col justify-evenly items-center  relative"
            >
              <div className="w-full flex items-center justify-between">
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={item.imageURL}
                  alt=""
                  className="w-40 max-h-[130px] -mt-8 drop-shadow-2xl"
                />
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-700  flex items-center justify-center cursor-pointer hover:shadow-md "
                  onClick={() => addtocart(item)}
                >
                  <MdShoppingBasket className="text-white " />
                </motion.div>
              </div>

              <div className="w-full flex flex-col   items-end  justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-gray-500">{item.calories}</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">₹</span>
                    {item.price}
                  </p>
                  {item.qty && (
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full  flex flex-col items-center justify-center">
          <img src={NotFound} className="h-300 w-full" alt="" />
          <p className="text-xl text-headingColor font-semibold my-4">
            Items not Available{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
