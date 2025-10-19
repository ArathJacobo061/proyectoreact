import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { initialState, tasksReducer } from "./tasksReducer";

const TasksContext = createContext(null);
const LS = "quest.tasks";

const uid = () =>
  window.crypto?.randomUUID?.() ??
  Math.random().toString(36).slice(2) + Date.now().toString(36);

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // ✅ Evita guardar antes de terminar la carga inicial
  const hydratedRef = useRef(false);

  // Cargar una vez desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "INIT", payload: parsed });
      } else {
        // datos de ejemplo si no hay nada
        const base = [
          { id: uid(), text: "comprar comida", done: false },
          { id: uid(), text: "ir al trabajo jeje", done: false },
          { id: uid(), text: "comer hoy", done: true },
        ];
        dispatch({ type: "INIT", payload: base });
      }
    } finally {
      // marcamos como hidratado para permitir guardados posteriores
      hydratedRef.current = true;
    }
  }, []);

  // Guardar cuando cambian las tareas (solo si ya hidratamos)
  useEffect(() => {
    if (!hydratedRef.current) return; // ⛔ evita pisar con []
    try {
      localStorage.setItem(LS, JSON.stringify(state.tasks));
    } catch (e) {
      // opcional: manejar cuota llena, etc.
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }, [state.tasks]);

  const value = useMemo(() => ({ state, dispatch, uid }), [state]);
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}
