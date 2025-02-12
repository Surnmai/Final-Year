import React, { useState } from "react";

// import Icons
import {
  IconCircleDashedCheck,
  IconHourglassHigh,
  IconUserScan,
} from "@tabler/icons-react";

// import useNavigate
import { useNavigate } from "react-router-dom";

// import components
import MetricsCard from "./MetricsCard.tsx";

const DisplayInfo = () => {
  // Use Navigate
  const Navigate = useNavigate();

  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiPersonalisedTreatment: 0,
    totalScreenings: 0,
    completedScreenings: 0,
    pendingScreenings: 0,
    overdueScreenings: 0,
  });

  const metricsData = [
    {
      title: "Specialist Appointment Pending",
      subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      onclick: () => Navigate("/appointments/pending"),
    },
    {
      title: "Treatment Progress Update",
      subtitle: "View",
      value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
      icon: IconCircleDashedCheck,
      onclick: () => Navigate("/appointments/progress"),
    },
    {
      title: "Total Folders",
      subtitle: "View",
      value: metrics.totalFolders,
      icon: IconCircleDashedCheck,
      onclick: () => Navigate("/folders"),
    },
    {
      title: "Total Screenings",
      subtitle: "View",
      value: metrics.totalScreenings,
      icon: IconUserScan,
      onclick: () => Navigate("/screenings"),
    },
    {
      title: "Completed Screenings",
      subtitle: "View",
      value: metrics.completedScreenings,
      icon: IconCircleDashedCheck,
      onclick: () => Navigate("/screenings/completed"),
    },
    {
      title: "Pending Screenings",
      subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconCircleDashedCheck,
      onclick: () => Navigate("/screenings/pending"),
    },
    {
      title: "Overdue Screenings",
      subtitle: "View",
      value: metrics.overdueScreenings,
      icon: IconCircleDashedCheck,
      onclick: () => Navigate("/screenings/overdue"),
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-[26px]">
        <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
          {/* {console.table(metricsData.slice(0, 2))} */}
          {metricsData.slice(0, 2).map((metric) => {
            return <MetricsCard key={metric.title} {...metric} />;
          })}
        </div>
        <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {/* {console.table(metricsData.slice(2))} */}
          {metricsData.slice(2).map((metric) => {
            return <MetricsCard key={metric.title} {...metric} />;
          })}
        </div>
      </div>
    </>
  );
};

export default DisplayInfo;
