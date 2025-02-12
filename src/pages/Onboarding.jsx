import React from "react";
import { user } from "../assets";

// import Global Context from UseContext API
import { useGlobalContext } from "../context";

// import privy
import { usePrivy } from "@privy-io/react-auth";

// import useNavigate
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  // destrcutre global context
  const {
    createUser,
    username,
    setUerName,
    age,
    setAge,
    location,
    setLocation,
  } = useGlobalContext();

  // destructure usePrivy
  const { user } = usePrivy();
  // console.log(user);

  // destructure useNavigate
  const navigate = useNavigate();

  //   handle Onboarding function
  const handleOnboarding = async (e) => {
    e.preventDefault();

    // console.log(username, age, location);

    const userData = {
      username,
      age: parseInt(age, 10),
      location,
      createdBy: user.email.address,
    };

    const newUser = await createUser(userData);
    // console.log(newUser);

    if (newUser) {
      navigate("/profile");
    }
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
                className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none focus:outline-searchIconColor"
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
                className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none focus:outline-searchIconColor"
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
                className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus-within:outline-none focus:outline-searchIconColor"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-searchIconColor py-3 font-semibold text-white transition duration-300 hover:bg-[#16a763]"
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
