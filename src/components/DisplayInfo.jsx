import React, { useEffect, useState } from "react";

// import Icons
import {
  IconCircleDashedCheck,
  IconHourglassHigh,
  IconUserScan,
} from "@tabler/icons-react";

// import useNavigate
// import { useNavigate } from "react-router-dom";

// import Context API
import { useGlobalContext } from "../context/index.jsx";

// import usePrivy
import { usePrivy } from "@privy-io/react-auth";

// import components
import MetricsCard from "./MetricsCard.tsx";

const DisplayInfo = () => {
  //  destructure se Navigate
  // const Navigate = useNavigate();

  // destructure useGlobalContext
  const { fetchUserRecords, fetchUserByEmail, records } = useGlobalContext();

  //  destructure usePrivy
  const { user } = usePrivy();

  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiPersonalisedTreatment: 0,
    totalScreenings: 0,
    completedScreenings: 0,
    pendingScreenings: 0,
    overdueScreenings: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address)
        .then(() => {
          const totalFolders = records.length;
          let aiPersonalisedTreatment = 0;
          let totalScreenings = 0;
          let completedScreenings = 0;
          let pendingScreenings = 0;
          let overdueScreenings = 0;

          records.forEach((record) => {
            if (record.kanbanRecords) {
              try {
                const kanban = JSON.parse(record.kanbanRecords);
                aiPersonalisedTreatment += kanban.columns.some((column) =>
                  column.title === "AI Personalized Treatment" ? 1 : 0,
                );

                totalScreenings += kanban.tasks.length;
                completedScreenings += kanban.tasks.filter((task) => {
                  task.comlumnID === "done";
                }).length;
                pendingScreenings += kanban.tasks.filter((task) => {
                  task.comlumnID === "doing";
                }).length;
                overdueScreenings += kanban.tasks.filter((task) => {
                  task.comlumnID === "overdue";
                }).length;
              } catch (error) {
                console.error("Failed to pass KanbanRecords: ", error);
              }
            }
          });

          setMetrics({
            totalFolders,
            totalScreenings,
            aiPersonalisedTreatment,
            pendingScreenings,
            completedScreenings,
            overdueScreenings,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user, fetchUserRecords, records]);

  const metricsData = [
    {
      title: "Specialist Appointment Pending",
      // subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      // onclick: () => Navigate("/appointments/pending"),
    },
    {
      title: "Treatment Progress Update",
      // subtitle: "View",
      value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
      icon: IconCircleDashedCheck,
      // onclick: () => Navigate("/appointments/progress"),
    },
    {
      title: "Total Folders",
      // subtitle: "View",
      value: metrics.totalFolders,
      icon: IconCircleDashedCheck,
      // onclick: () => Navigate("/folders"),
    },
    {
      title: "Total Screenings",
      // subtitle: "View",
      value: metrics.totalScreenings,
      icon: IconUserScan,
      // onclick: () => Navigate("/screenings"),
    },
    {
      title: "Completed Screenings",
      // subtitle: "View",
      value: metrics.completedScreenings,
      icon: IconCircleDashedCheck,
      // onclick: () => Navigate("/screenings/completed"),
    },
    {
      title: "Pending Screenings",
      // subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconCircleDashedCheck,
      // onclick: () => Navigate("/screenings/pending"),
    },
    {
      title: "Overdue Screenings",
      // subtitle: "View",
      value: metrics.overdueScreenings,
      icon: IconCircleDashedCheck,
      // onclick: () => Navigate("/screenings/overdue"),
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
