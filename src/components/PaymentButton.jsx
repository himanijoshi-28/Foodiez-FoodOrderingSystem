import React from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import Logo from "../img/logo.png";
import { savePaymentData } from "../utils/firebaseFunctions";
import { toast } from "react-toastify";
import { saveOrderData } from "../utils/firebaseFunctions";

const PaymentButton = ({ amount, order }) => {
  const [{ user }] = useStateValue();

  const savetoDB = (response) => {
    console.log("Payment response:", response);

    // Save payment data to Firestore
    savePaymentData({
      ...response,
      orderId: order.id,
      userName: user.displayName,
      userId: user.uid,
    });

    // Navigate to home page after a delay
    setTimeout(() => {
      localStorage.removeItem("cartItems");
    }, 1000);
  };
  const handleClick = () => {
    if (!order.addressLatLng) {
      // Show a toast message if addressLatLng is not present
      toast.error(
        "Please provide a shipping address before proceeding with payment."
      );
      console.log("order", order);

      return;
    } else {
      saveOrderData(order);
    }
    var options = {
      key: process.env.RAYZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Foodiez", //your business name
      description: "Test Transaction",
      image: Logo,

      handler: function (response) {
        savetoDB(response);
        console.log("staright from bank", response);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: user.displayName, //your customer's name
        email: user.email,
        contact: user.phoneNumber || "101010101", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: order.addressLatLng,
      },
      theme: {
        color: "#ffa500",
      },
    };
    // eslint-disable-next-line no-undef
    var propay = new Razorpay(options);
    propay.open();
  };

  return (
    <>
      {user ? (
        <motion.button
          whileTap={{ scale: 0.75 }}
          type="button"
          className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg "
          onClick={handleClick}
        >
          Pay Now
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.75 }}
          type="button"
          className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg "
        >
          Login to Checkout
        </motion.button>
      )}
    </>
  );
};

export default PaymentButton;
