import { useState } from "react";
import { useTasks } from "../context/TasksContext";

export default function TaskForm() {
  const [text, setText] = useState("");
  const { dispatch, uid } = useTasks();

  const submit = (e) => {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    dispatch({ type: "ADD_TASK", id: uid(), payload: { text: clean } });
    setText("");
  };

  return (
    <form className="tf" onSubmit={submit}>
      <input
        className="tf-input"
        placeholder="Escribe una tarea…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button className="btn-pill add" type="submit">Agregar</button>
    </form>
  );
}
