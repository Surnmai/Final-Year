import React from "react";

// import react router
import { useLocation } from "react-router-dom";

// import Components
import KanbanBoard from "../components/KanbanBoard";

const ScreeningSchedule = () => {
  const state = useLocation();
  console.log(state);

  //   console.log(state.tasks[0].content);

  return (
    <>
      <div className="w-full overflow-scroll">
        <KanbanBoard state={state} />;
      </div>
    </>
  );
};

export default ScreeningSchedule;
