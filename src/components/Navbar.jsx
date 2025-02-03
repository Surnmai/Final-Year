import React, { useCallback } from "react";

// import icons
import { search } from "../assets";

// import components
import CustomButton from "./CustomButton";

// import privy
import { usePrivy } from "@privy-io/react-auth";
import { use } from "react";

const Navbar = () => {
  // destructure privy hook
  const { ready, authenticated, login, user, logout } = usePrivy();

  console.log("User Info", user);

  //   handleLoginLogout function
  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      login().then(() => {
        if (user) {
          console.log(user);

          // fetch user
        }
      });
    }
  }, [authenticated, login, user, logout]);

  return (
    <>
      <section className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
        {/* search bar  */}
        <div className="flex h-[60px] max-w-[458px] flex-row rounded-[100px] bg-Sidebar_bgColor px-4 py-2 lg:flex-1">
          <input
            type="text"
            placeholder="search for records"
            className="placeholder:text-placeholderColor flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none"
          />
          <div className="bg-searchIconColor flex h-full w-[75px] cursor-pointer items-center justify-center rounded-[20px]">
            <img
              src={search}
              alt="search"
              className="h-[20px] w-[20px] object-contain"
            />
          </div>
        </div>

        {/* Login & logout Buttons  */}
        <div className="hidden flex-row justify-end gap-2 sm:flex">
          <CustomButton
            tittle={authenticated ? "Logout" : "Login"}
            handleClick={handleLoginLogout}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
