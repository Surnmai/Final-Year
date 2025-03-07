import React, { useMemo, useState } from "react";

// import drag and drop from dnd
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";

// import Components
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

// import Icons
import { IconPlus } from "@tabler/icons-react";

// import react router dom
import { createPortal } from "react-dom";

const KanbanBoard = ({ state }) => {
  const defaultCols =
    state?.state?.columns?.map((col) => ({
      id: col?.id,
      title: col?.title,
    })) || [];

  const defaultTasks =
    state?.state?.tasks?.map((task) => ({
      id: task?.id,
      columnId: task?.columnId,
      content: task?.content,
    })) || [];

  // function to delete Columns
  const deleteColumn = (id) => {
    setColumns(columns.filter((col) => col.id !== id));
    setTasks(tasks.filter((task) => task.columnId !== id));
  };

  // function to update Columns
  const updateColumn = (id, title) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)));
  };

  // function to create task
  const createTask = (columnId) => {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  // function to delete tasks
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  // function to update tasks
  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, content } : task,
    );
    setTasks(newTasks);
  };
  // function to generate a unique Id
  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  //   function to create new column
  const createNewColumn = () => {
    const newColumn = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };
  // function to set the active column state to a draggable columns and check if the dragged item is a task and set the active to a drag task
  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (isActiveAColumn) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === active.id);
        const overIndex = columns.findIndex((col) => col.id === over.id);
        return arrayMove(columns, activeIndex, overIndex);
      });
    } else {
      const isActiveATask = active.data.current?.type === "Task";
      const isOverATask = over.data.current?.type === "Task";
      if (isActiveATask && isOverATask) {
        // Handle task drag and drop within or between columns
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === active.id);
          const overIndex = tasks.findIndex((t) => t.id === over.id);
          //   Rearrange the tasks based on the drag and drop positions
          if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
            tasks[activeIndex].columnId = tasks[overIndex].columnId;
            return arrayMove(tasks, activeIndex, overIndex - 1);
          }
          return arrayMove(tasks, activeIndex, overIndex);
        });
      } else if (isActiveATask) {
        // Handle task drag and drop to a new column
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === active.id);
          tasks[activeIndex].columnId = over.id;
          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  };

  // the effect that will show when an element is dragged
  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else if (isActiveATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        tasks[activeIndex].columnId = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  // states to store columns and tasks
  const [columns, setColumns] = useState(defaultCols);
  const [tasks, setTasks] = useState(defaultTasks);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // states for the active columns and active task
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  // hold the initialization of the useSensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  return (
    <>
      <div className="mt-5 min-h-screen w-72 text-white">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={ondragend}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                  />
                ))}
              </SortableContext>
            </div>
            <button
              onClick={() => createNewColumn()}
              className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-green-500 hover:ring-2"
            >
              <IconPlus />
              Add Column
            </button>
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id,
                  )}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,

            // specifying the container where the overlay should be rendered
            document.body,
          )}
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;
