import React from "react";

const CustomButton = ({ tittle, handleClick }) => {
  return (
    <>
      <button
        type="button"
        className={`rounded-[10px] bg-[#1dc071] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white hover:bg-[#16a763] hover:transition-all hover:duration-300`}
        onClick={handleClick}
      >
        {tittle}
      </button>
    </>
  );
};

export default CustomButton;
