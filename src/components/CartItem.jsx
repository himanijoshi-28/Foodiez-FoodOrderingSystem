import React, { useEffect, useState, useRef } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty); // Initialize qty with item.qty
  const prevQtyRef = useRef(item.qty); // Keep track of previous qty
  const [{ cartItems }, dispatch] = useStateValue();

  // Update qty when item.qty changes
  useEffect(() => {
    if (prevQtyRef.current !== item.qty) {
      setQty(item.qty);
      prevQtyRef.current = item.qty;
    }
  }, [item.qty]);

  useEffect(() => {
    // Update local storage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQty = (action, id) => {
    const updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex((item) => item.id === id);

    if (action === "add") {
      setQty(qty + 1);
      updatedCartItems[itemIndex].qty += 1;
    } else {
      if (qty === 1) {
        setQty(0);
        updatedCartItems.splice(itemIndex, 1);
      } else {
        setQty(qty - 1);
        updatedCartItems[itemIndex].qty -= 1;
      }
    }

    dispatch({ type: actionType.SET_CARTITEMS, cartItems: updatedCartItems });
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item.imageURL}
        alt=""
      />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {item?.price * qty}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} className="">
          <BiMinus
            className="text-gray-50"
            onClick={() => updateQty("remove", item.id)}
          />
        </motion.div>
        <p className="w-5 h-5 rounded-md bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div whileTap={{ scale: 0.75 }} className="">
          <BiPlus
            className="text-gray-50"
            onClick={() => updateQty("add", item.id)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
