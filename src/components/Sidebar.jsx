import React from "react";

// import NavLinks
import { navLinks } from "../constants/data";

// import icons
// import { sun } from "../assets";

// React Router DOM
import { Link, useNavigate } from "react-router-dom";

// import Icons
import { IconHeartHandshake } from "@tabler/icons-react";

// import component
import Icon from "./Icon";

// import Global Context
import { useGlobalContext } from "../context";

const Sidebar = () => {
  const navigate = useNavigate();

  // destructure global context
  const { isActive, setIsActive } = useGlobalContext();

  return (
    <>
      <section className="relative mr-10 hidden sm:flex">
        <div className="sticky top-5 h-[93vh] flex-col items-center justify-between">
          <Link to="/" className="flex items-center justify-center">
            <div className="rounded-[10px] bg-Sidebar_iconBg p-2">
              <IconHeartHandshake size={40} color="#1ec070" />
            </div>
          </Link>

          <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-Sidebar_bgColor py-4">
            <div className="flex flex-col items-center justify-center gap-3">
              {navLinks.map((link) => {
                // console.log(link);
                return (
                  <Icon
                    key={link.name}
                    {...link}
                    isActive={isActive}
                    handleClick={() => {
                      setIsActive(link.name);
                      navigate(link.link);
                    }}
                  />
                );
              })}
            </div>

            {/* <Icon styles="bg-[#1c1c24] shadow-secondary" imageUrl={sun} /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
