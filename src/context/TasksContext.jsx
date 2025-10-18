import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { initialState, tasksReducer } from "./tasksReducer";

const TasksContext = createContext(null);
const LS = "quest.tasks";
const uid = () =>
  (window.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2) + Date.now().toString(36));

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // cargar desde localStorage una vez
  useEffect(() => {
    const saved = localStorage.getItem(LS);
    const base = saved
      ? JSON.parse(saved)
      : [
          { id: uid(), text: "comprar comida", done: false },
          { id: uid(), text: "ir al trabajo jeje", done: false },
          { id: uid(), text: "comer hoy", done: true },
        ];
    dispatch({ type: "INIT", payload: base });
  }, []);

  // persistir cuando cambian las tareas
  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const value = useMemo(() => ({ state, dispatch, uid }), [state]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}
