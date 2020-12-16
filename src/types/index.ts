export interface TaskInterface {
  name: string;
  id: string;
  completed: boolean;
}

export interface AppProps {
  tasks: Array<TaskInterface>;
}
export interface AppState {
  tasks: Array<TaskInterface>;
  filter: "All" | "Active" | "Completed";
}

export interface TodoProps {
  name: TaskInterface["name"];
  completed: TaskInterface["completed"];
  id: TaskInterface["id"];
  onToggleTaskCompleted: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newName: string) => void;
}

export interface FormProps {
  onAddTask: (name: string) => void;
}

export interface FilterButtonProps {
  name: "All" | "Active" | "Completed";
  isPressed: boolean;
  setFilter: (name: "All" | "Active" | "Completed") => void;
}
