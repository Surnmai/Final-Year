import React, { useMemo, useState } from "react";

// import DND
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// import Components
import TaskCard from "./TaskCard";

// import icons
import { IconPlus, IconTrash } from "@tabler/icons-react";

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  // state to manage whether the colmn is in an edit mode
  const [editMode, setEditMode] = useState(false);

  // function to memoise the task Id to optimize performance
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    // disable dragging when in edit mode
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-green-500 bg-mainBackgroundColor p-3 text-left opacity-30"
        />
      </>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-xl bg-[#1c1c24]"
      >
        <div
          {...attributes}
          {...listeners}
          onClick={() => {
            setEditMode(true);
          }}
          className="text-md m-2 flex h-[60px] cursor-grab items-center justify-between rounded-xl bg-[#13131a] p-3 font-bold"
        >
          <div className="flex gap-2">
            {!editMode && column.title}
            {editMode && (
              <input
                className="rounded border bg-black px-2 outline-none focus:border-green-500"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
            className="rounded stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor hover:stroke-white"
          >
            <IconTrash />
          </button>
        </div>
        {/* container for the taks card  */}
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>

        <button
          className="flex items-center gap-2 rounded-md border-2 border-columnBackgroundColor border-x-columnBackgroundColor p-4 hover:bg-mainBackgroundColor hover:text-green-500 active:bg-black"
          onClick={() => {
            createTask(column.id);
          }}
        >
          <IconPlus />
          Add task
        </button>
      </div>
    </>
  );
};

export default ColumnContainer;
