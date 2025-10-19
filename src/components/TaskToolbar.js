import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";

export default function TaskToolbar() {
  const { state, dispatch } = useTasks();
  const navigate = useNavigate();

  const onFilterChange = (e) => {
    const v = e.target.value; // "all" | "active" | "done"
    // La URL es la verdad: navegamos y el hook de App.js actualizará el filtro
    navigate(v === "all" ? "/" : v === "active" ? "/pendientes" : "/completadas");
  };

  const onSearchChange = (e) => {
    dispatch({ type: "SET_QUERY", payload: e.target.value });
  };

  return (
    <div className="toolbar">
      <select
        className="sel"
        value={state.filter}         // controlado por el estado global
        onChange={onFilterChange}
      >
        <option value="all">Todas</option>
        <option value="active">Pendientes</option>
        <option value="done">Completadas</option>
      </select>

      <input
        className="search"
        placeholder="Buscar…"
        value={state.query}
        onChange={onSearchChange}
      />
    </div>
  );
}
