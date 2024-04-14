import React from "react";
import ABOUTUS from "../img/Designer.jpeg";
import TEAM1 from "../img/chef1.jpeg";
import TEAM2 from "../img/Designer (3).jpeg";
import TEAM3 from "../img/Designer (5).jpeg";
const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="container  px-4 py-8">
        <h1 className="text-3xl font-semibold  text-center mb-4 text-textColor">
          About Foodiez
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="max-w-md  md:mr-8 mb-4 md:mb-0">
            <img
              src={ABOUTUS}
              alt="About Us"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="max-w-md">
            <p className="text-lg text-gray-800 mb-4">
              At Foodiez, we are passionate about good food and bringing people
              together over delicious meals.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Our journey began with a simple idea: to create a platform where
              food lovers from all walks of life can discover new culinary
              experiences, share their favorite recipes, and connect with
              like-minded individuals.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Whether you're a seasoned chef or just starting your culinary
              adventures, Foodiez is your go-to destination for everything
              food-related. From mouth-watering recipes to insightful cooking
              tips and vibrant community forums, we've got you covered.
            </p>
            <p className="text-lg text-gray-800">
              Join us on this flavorful journey and let's explore the world of
              food together!
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4 text-textColor">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="max-w-xs mx-auto">
            <img
              src={TEAM1}
              alt="Team Member 1"
              className="rounded-full w-32 h-32 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-center mb-1">John Doe</h3>
            <p className="text-gray-800 text-center">Founder & CEO</p>
          </div>
          <div className="max-w-xs mx-auto">
            <img
              src={TEAM2}
              alt="Team Member 2"
              className="rounded-full w-32 h-32 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-center mb-1">
              Jane Smith
            </h3>
            <p className="text-gray-800 text-center">Head Chef</p>
          </div>
          <div className="max-w-xs mx-auto">
            <img
              src={TEAM3}
              alt="Team Member 3"
              className="rounded-full w-32 h-32 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-center mb-1">
              Michael Johnson
            </h3>
            <p className="text-gray-800 text-center">Marketing Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
