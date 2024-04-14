import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";
import { actionType } from "../context/reducer";
import CartItem from "./CartItem";
import { toast } from "react-toastify";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const navigate = useNavigate();
  const ShowCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };
  const clearCart = () => {
    // eslint-disable-next-line array-callback-return
    cartItems.map((citm) => {
      citm.qty = 1;
    });
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let totalPrice = 0;
    let itemsInCart = JSON.parse(localStorage.getItem("cartItems"));
    // console.log("itemsInCart:", itemsInCart);
    // itemsInCart > 0 &&
    itemsInCart.map((itm) => {
      totalPrice = totalPrice + itm.qty * itm.price;
    });
    setTot(totalPrice);
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[500px] h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center  justify-between p-4 cursor-pointer ">
        <motion.div whileTap={{ scale: 0.75 }} onClick={ShowCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl " />
        </motion.div>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="text-textColor text-lg font-semibold"
        >
          Cart
        </motion.p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart items  */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cartitem */}
            {cartItems &&
              cartItems.map((item) => (
                // <CartItem key={item.id} item={item} />;
                <CartItem key={item.id} item={item} />
              ))}
          </div>

          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-10 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">₹{tot}</p>
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

            <motion.button
              whileTap={{ scale: 0.75 }}
              type="button"
              className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg "
              onClick={() => {
                if (user) {
                  navigate("/checkout");
                } else {
                  toast.error("Please login to proceed with checkout ");
                }
              }}
            >
              Proceed to Pay
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart{" "}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
