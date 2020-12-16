import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { TaskInterface, AppProps, AppState } from "./types";
import { createId, usePrevious } from "./tools";

const FILTER_MAP = {
  All: () => true,
  Active: (task: TaskInterface) => !task.completed,
  Completed: (task: TaskInterface) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP) as Array<
  "All" | "Active" | "Completed"
>;

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const [tasks, setTasks] = useState<AppState["tasks"]>(props.tasks);
  const [filter, setFilter] = useState<AppState["filter"]>("All");
  const listHeadingRef = useRef<HTMLHeadingElement>(null);

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (prevTaskLength && tasks.length - prevTaskLength === -1) {
      if (listHeadingRef && listHeadingRef.current) {
        listHeadingRef.current.focus();
      }
    }
  }, [tasks.length, prevTaskLength]);

  const handlAddTask = (name: string) => {
    const id = `todo-${createId()}`;
    const completed = false;
    const newTask: TaskInterface = { id, name, completed };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleEditTask = (id: string, newName: string) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const handleDeleteTask = (id: string) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task: TaskInterface) => (
      <Todo
        id={task.id}
        completed={task.completed}
        name={task.name}
        key={task.id}
        onToggleTaskCompleted={handleToggleTaskCompleted}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form onAddTask={handlAddTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
};

export default App;
