import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";

import { actionType } from "../context/reducer";
import { saveUser } from "../utils/firebaseFunctions";
import { toast } from "react-toastify";

const Header = () => {
  const firebaseauth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseauth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
      toast.success("Login Success!!");
      //push loggedin user info to the local storage int the name user and  converting inthe json
      saveUser(providerData[0]);
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    toast.success("Come back soon!!");
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const ShowCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };
  return (
    <>
      <header className=" fixed z-[100] w-screen  p-3 px-4 md:px-16 bg-primary">
        {/* desktop and tab  */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <Link to={"/"} className="flex items-center gap-2">
            <img className=" w-8 object-cover" src={Logo} alt="logo" />
            <p className="text-headingColor text-xl font-bold">Foodiez</p>
          </Link>
          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex  items-center gap-8 "
            >
              <li
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <Link to="/*"> Home</Link>
              </li>
              <li
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <Link to="/menupage ">Menu</Link>
              </li>
              <li
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => {
                  setIsMenu(false);
                }}
              >
                <Link to="/aboutus">About Us</Link>
              </li>
            </motion.ul>

            <div
              className="relative flex items-center justify-center"
              onClick={ShowCart}
            >
              <MdShoppingBasket className="text-textColor text-2xl  " />
              {cartItems && cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.6 }}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                src={user ? user.photoURL : Avatar}
                alt="userprofile"
                onClick={login}
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
                >
                  {user && user.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <>
                      <Link to={"/createItem"}>
                        <p
                          className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                          onClick={() => {
                            setIsMenu(false);
                          }}
                        >
                          New Item <MdAdd />
                        </p>
                      </Link>
                      <Link to={"/deliveryPage"}>
                        <p
                          className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                          onClick={() => {
                            setIsMenu(false);
                          }}
                        >
                          Deliveries <MdAdd />
                        </p>
                      </Link>
                    </>
                  )}
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                  >
                    Logout
                    <MdLogout />
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full cursor-pointer">
          <div
            className="relative flex items-center justify-center"
            onClick={ShowCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <Link to={"/"} className="flex items-center gap-2">
            <img className=" w-8 object-cover" src={Logo} alt="logo" />
            <p className="text-headingColor text-xl font-bold">Foodiez</p>
          </Link>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-0 "
              >
                {user && user.email === "heemanijoshi28@gmail.com" && (
                  <>
                    <Link to={"/createItem"}>
                      <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => {
                          setIsMenu(false);
                        }}
                      >
                        New Item <MdAdd />
                      </p>
                    </Link>
                    <Link to={"/deliveryPage"}>
                      <p
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => {
                          setIsMenu(false);
                        }}
                      >
                        Deliveries <MdAdd />
                      </p>
                    </Link>
                  </>
                )}
                <ul className="flex flex-col  ">
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  hover:bg-slate-100 px-4 py-2 "
                    onClick={() => {
                      setIsMenu(false);
                    }}
                  >
                    Home
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 "
                    onClick={() => {
                      setIsMenu(false);
                    }}
                  >
                    Menu
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 "
                    onClick={() => {
                      setIsMenu(false);
                    }}
                  >
                    About Us
                  </li>
                </ul>
                <p
                  className="m-1 p-2 flex rounded-md shadow-md items-center  justify-center bg-gray-200 gap-3 cursor-pointer  transition-all duration-100 ease-in-out text-textColor text-base hover:bg-slate-300 px-4 py-2  "
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
