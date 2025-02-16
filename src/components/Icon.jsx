import React from "react";

const Icon = ({ styles, name, imageUrl, isActive, disabled, handleClick }) => {
  return (
    <>
      <div
        className={`h-[60px] w-[60px] rounded-[10px] py-7 ${isActive && isActive === name && "bg-Sidebar_iconBg"} flex items-center justify-center`}
        onClick={handleClick}
      >
        <img src={imageUrl} alt={name} className="h-7 w-7 cursor-pointer" />
        {/* {!isActive ? (
          <img src={imageUrl} alt="beat-cancer logo" className="h-9 w-9" />
        ) : (
          <img
            src={imageUrl}
            alt="beat-cancer logo"
            className={`h-8 w-8 ${isActive !== name && "bg"}`}
          />
        )} */}
      </div>
    </>
  );
};

export default Icon;
