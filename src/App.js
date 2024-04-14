import React, { useEffect, useState } from "react";
import { Header, MenuPage } from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";

import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import CheckoutPage from "./components/CheckoutPage";
import AboutUs from "./components/AboutUs";
import DeliveryBOY from "./components/DeliveryBOY";

function App() {
  const [showHeader, setShowHeader] = useState(true); // Default to true
  const [{ foodItems, user }, dispatch] = useStateValue();
  const location = useLocation(); // Get the current location
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
    // Hide header on checkout page
    if (location.pathname === "/checkout") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]); // Update whenever the pathname changes
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary ">
        {showHeader && <Header />}

        <main className="mt-14 md:mt-20  px-4 md:px-16 py-4 w-full ">
          <Routes>
            {user && <Route path="/checkout" element={<CheckoutPage />} />}
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/menupage" element={<MenuPage />} />
            <Route path="/deliveryPage" element={<DeliveryBOY />} />
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
