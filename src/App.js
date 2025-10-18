import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { TasksProvider, useTasks } from "./context/TasksContext";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskToolbar from "./components/TaskToolbar";
import TaskList from "./components/TaskList";
import "./App.css";

/* Sincroniza filtro <-> URL */
function useRouteFilter() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { state, dispatch } = useTasks();

  // ruta -> filtro
  useEffect(() => {
    const f = pathname === "/" ? "all" : pathname === "/pendientes" ? "active" : "done";
    if (f !== state.filter) dispatch({ type: "SET_FILTER", payload: f });
  }, [pathname, state.filter, dispatch]);

  // filtro -> ruta
  useEffect(() => {
    const path = state.filter === "all" ? "/" : state.filter === "active" ? "/pendientes" : "/completadas";
    if (pathname !== path) nav(path, { replace: true });
  }, [state.filter, nav, pathname]);
}

function AppInner() {
  const { state } = useTasks();
  useRouteFilter();

  const pending = state.tasks.filter(t => !t.done).length;
  const done = state.tasks.length - pending;

  const filtered = state.tasks
    .filter(t => (state.filter === "all" ? true : state.filter === "active" ? !t.done : t.done))
    .filter(t => t.text.toLowerCase().includes(state.query.toLowerCase()));

  return (
    <>
      <Header />
      <h1>Bienvenido al gestor de tareas</h1>

      <div className="wrap">
        <p className="counter">{pending} pendientes · {done} completadas</p>

        <TaskForm />
        <TaskToolbar />

        <Routes>
          <Route path="/" element={<TaskList tasks={filtered} />} />
          <Route path="/pendientes" element={<TaskList tasks={filtered} />} />
          <Route path="/completadas" element={<TaskList tasks={filtered} />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <AppInner />
      </TasksProvider>
    </BrowserRouter>
  );
}
