import React, { useCallback, useState } from "react";

// import icons
import { close, loader, menu, search } from "../assets";
import { IconHeartHandshake, IconMenu2, IconX } from "@tabler/icons-react";

// import components
import CustomButton from "./CustomButton";

// import privy
import { usePrivy } from "@privy-io/react-auth";

// import data
import { navLinks } from "../constants/data";

// import useNavigate
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // destructure privy hook
  const { ready, authenticated, login, user, logout } = usePrivy();
  const [mobile, setMobile] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  const navigate = useNavigate();

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

        {/* mobile nav  */}
        <div className="relative flex items-center justify-between sm:hidden">
          {/* Logo Icon  */}
          <div className="flex h-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-Sidebar_bgColor">
            <IconHeartHandshake size={40} color="#1ec070" />
          </div>

          {/* menu & close Icons  */}
          <div onClick={() => setMobile(!mobile)}>
            {mobile ? (
              <IconX className="text-placeholderColor h-10 w-10 cursor-pointer" />
            ) : (
              <IconMenu2 className="text-placeholderColor h-10 w-10 cursor-pointer" />
            )}
          </div>

          {/* menu Items  */}
          <div
            className={`absolute left-0 right-0 top-[60px] z-10 bg-Sidebar_bgColor py-4 shadow-secondary ${!mobile ? "-translate-y-[100vh]" : "translate-y-0"} transition-all duration-700`}
          >
            <ul className="mb-4">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.name}
                    className={`text-searchIconColor flex gap-4 p-4 font-extrabold ${isActive === link.name && "bg-[#3a3a43]"} `}
                    onClick={() => {
                      setIsActive(link.name);
                      setMobile(false);
                      navigate(link.link);
                    }}
                  >
                    <img src={link.imageUrl} alt={link.name} />
                    {link.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
