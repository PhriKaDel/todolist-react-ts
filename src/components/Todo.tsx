import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { usePrevious } from "../tools";
import { TodoProps } from "../types";

const Todo: React.FunctionComponent<TodoProps> = (
  props: TodoProps
): JSX.Element => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const wasEditing = usePrevious(isEditing);
  const editFieldRef = useRef<HTMLInputElement | null>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (wasEditing && isEditing) {
      if (editFieldRef && editFieldRef.current) {
        editFieldRef.current.focus();
      }
    } else if (wasEditing && editButtonRef && editButtonRef.current)
      editButtonRef.current.focus();
  }, [wasEditing, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onEditTask(props.id, newName);
    setNewName("");
    setEditing(false);
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          value={newName}
          type="text"
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.onToggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.onDeleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default Todo;
