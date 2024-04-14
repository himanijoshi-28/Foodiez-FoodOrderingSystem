import React from "react";
import Delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 gap-2 md:grid-cols-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start  gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500  font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 bg-white h-8 rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery In
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          "Welcome to Foodiez - where every bite tells a story! Explore our
          diverse menu crafted with passion and precision. From sizzling
          appetizers to indulgent desserts, embark on a culinary journey that
          tantalizes your taste buds. Order now and let the flavors speak for
          themselves!"
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 "
        >
          <Link to="/menupage">Order Now </Link>
        </button>
      </div>

      <div className="py-2  flex-1 flex  items-center relative ">
        <img
          src={heroBg}
          className="ml-auto   h-420 w-full lg:w-auto lg:h-650 "
          alt="hero-bg "
        />
        <div className="w-full h-full absolute top-0 left-0 lg:px-32 flex  justify-center  items-center  py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => {
              return (
                <div
                  key={n.id}
                  className=" lg:w-190  p-4 bg-cardOverlay  rounded-3xl backdrop-blur-md  flex flex-col items-center justify-center drop-shadow-lg "
                >
                  <img
                    src={n.imageSrc}
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20  "
                    alt="i1"
                  />
                  {/* -top-32 */}
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {n.name}
                  </p>

                  <p className=" text-[8px] lg:text-[15px] text-lighttextGray font-semibold  my-1 lg:my-3 ">
                    {n.desp}
                  </p>

                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-sm text-red-600">$</span>
                    {n.price}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
