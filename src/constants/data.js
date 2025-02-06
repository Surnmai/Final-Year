import { screening, user, apps, records } from "../assets";

// import useNavigate
// import { useNavigate } from "react-router-dom";

export const navLinks = [
  { name: "dashboard", imageUrl: apps, link: "/" },
  { name: "records", imageUrl: records, link: "/medical-records" },
  { name: "screening", imageUrl: screening, link: "/screening-schedules" },
  { name: "user", imageUrl: user, link: "/profile" },
];

// import Icons
// import {
//   IconCircleDashedCheck,
//   IconHourglassHigh,
//   IconUserScan,
// } from "@tabler/icons-react";

// Use Navigate
// const Navigate = useNavigate();

// export const metricsData = [
//   {
//     title: "Specialist Appointment Pending",
//     subtitle: "View",
//     value: metrics.pendingScreenings,
//     icon: IconHourglassHigh,
//     onclick: () => Navigate("/appointments/pending"),
//   },
//   {
//     title: "Treatment Progress Update",
//     subtitle: "View",
//     value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
//     icon: IconCircleDashedCheck,
//     onclick: () => Navigate("/appointments/progress"),
//   },
//   {
//     title: "Total Folders",
//     subtitle: "View",
//     value: metrics.totalFolders,
//     icon: IconCircleDashedCheck,
//     onclick: () => Navigate("/folders"),
//   },
//   {
//     title: "Total Screenings",
//     subtitle: "View",
//     value: metrics.totalScreenings,
//     icon: IconUserScan,
//     onclick: () => Navigate("/screenings"),
//   },
//   {
//     title: "Completed Screenings",
//     subtitle: "View",
//     value: metrics.completedScreenings,
//     icon: IconCircleDashedCheck,
//     onclick: () => Navigate("/screenings/completed"),
//   },
//   {
//     title: "Pending Screenings",
//     subtitle: "View",
//     value: metrics.pendingScreenings,
//     icon: IconCircleDashedCheck,
//     onclick: () => Navigate("/screenings/pending"),
//   },
//   {
//     title: "Overdue Screenings",
//     subtitle: "View",
//     value: metrics.overdueScreenings,
//     icon: IconCircleDashedCheck,
//     onclick: () => Navigate("/screenings/overdue"),
//   },
// ];
