import React, { useState } from "react";
import { user } from "../assets";

const Onboarding = () => {
  const [username, setUerName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  //   handle Onboarding function
  const handleOnboarding = async (e) => {
    e.preventDefault();

    // console.log(username, age, location);
  };
  return (
    <>
      <div className="grid place-items-center">
        <div className="w-full max-w-md rounded-xl bg-Sidebar_bgColor p-8 shadow-lg">
          {/* Emoji and Welcome Message  */}
          <h2 className="mb-2 text-center text-5xl font-bold">👋🏾</h2>
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Welcome, Let's Get Started
          </h2>

          {/* form  */}
          <form onSubmit={handleOnboarding}>
            {/* UserName  */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="mb-2 block text-sm text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                pattern="^[A-Za-z\s]{3,}$"
                value={username}
                onChange={(e) => setUerName(e.target.value)}
                required
                className="focus:outline-searchIconColor w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none"
              />
            </div>
            {/* Age  */}
            <div className="mb-4">
              <label htmlFor="age" className="mb-2 block text-sm text-gray-300">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="focus:outline-searchIconColor w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none"
              />
            </div>
            {/* Location  */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="mb-2 block text-sm text-gray-300"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                pattern="^[A-Za-z\s]{3,}$"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="focus:outline-searchIconColor w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-searchIconColor mt-4 w-full rounded-lg py-3 font-semibold text-white transition duration-300 hover:bg-[#16a763]"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
