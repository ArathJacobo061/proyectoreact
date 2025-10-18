import { useEffect, useRef, useState } from "react";
import { useTasks } from "../context/TasksContext";

export default function TaskItem({ task, style }) {
  const { dispatch } = useTasks();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const startEdit  = () => { setValue(task.text); setEditing(true); };
  const cancelEdit = () => { setEditing(false); setValue(task.text); };
  const commitEdit = () => {
    const clean = value.trim();
    if (!clean || clean === task.text) { setEditing(false); return; }
    dispatch({ type: "UPDATE_TASK", payload: { id: task.id, text: clean } });
    setEditing(false);
  };
  const onKey = (e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") cancelEdit(); };

  return (
    <li style={style} className={`row ${task.done ? "is-done" : ""} ${editing ? "is-editing" : ""}`}>
      <label className="left">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch({ type: "TOGGLE_TASK", payload: { id: task.id } })}
          aria-label="Marcar tarea"
        />
        {!editing ? (
          <span className="txt" onDoubleClick={startEdit} title="Doble click para editar">
            {task.text}
          </span>
        ) : (
          <input
            ref={inputRef}
            className="edit-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={onKey}
            aria-label="Editar texto de la tarea"
          />
        )}
      </label>

      <div className="right">
        {!editing ? (
          <>
            <button className="btn-pill ghost" onClick={startEdit}>Editar</button>
            <button className="btn-pill danger" onClick={() => dispatch({ type: "REMOVE_TASK", payload: { id: task.id } })}>
              Borrar
            </button>
          </>
        ) : (
          <>
            <button className="btn-pill add" onClick={commitEdit}>Guardar</button>
            <button className="btn-pill danger" onClick={cancelEdit}>Cancelar</button>
          </>
        )}
      </div>
    </li>
  );
}
