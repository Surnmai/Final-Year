import React from "react";

// import Tabler Icons
// import { IconChevronRight } from "@tabler/icons-react";

const MetricsCard = ({ title, value, icon: Icon, onClick }) => {
  return (
    <>
      <div className="flex flex-col rounded-xl border bg-white dark:border-neutral-800 dark:bg-[#13131a]">
        {/* Title and Value  */}
        <div className="flex justify-between gap-x-3 p-4 md:p-5">
          {/* Title  */}
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {title}
            </p>

            {/* Value  */}
            <div className="mt-1 flex items-center gap-x-2">
              <h3 className="text-xl font-medium text-neutral-200 sm:text-2xl">
                {value}
              </h3>
            </div>
          </div>

          {/* Icon  */}
          <div className="flex size-[46px] flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-blue-200 dark:bg-Sidebar_bgColor">
            <Icon size={25} className="text-green-500" />
          </div>
        </div>

        {/* Link and Icon  */}
        {/* <a
          href="#"
          onClick={onClick}
          className="inline-flex items-center justify-between rounded-b-xl border-t border-neutral-800 px-4 py-3 text-sm text-neutral-400 hover:bg-neutral-800 md:px-5"
        >
          {subtitle}
          <IconChevronRight />
        </a> */}
      </div>
    </>
  );
};

export default MetricsCard;
