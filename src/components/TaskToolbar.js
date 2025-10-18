import { useTasks } from "../context/TasksContext";

export default function TaskToolbar() {
  const { state, dispatch } = useTasks();

  return (
    <div className="toolbar">
      <select
        className="sel"
        value={state.filter}
        onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })}
      >
        <option value="all">Todas</option>
        <option value="active">Pendientes</option>
        <option value="done">Completadas</option>
      </select>

      <input
        className="search"
        placeholder="Buscar…"
        value={state.query}
        onChange={(e) => dispatch({ type: "SET_QUERY", payload: e.target.value })}
      />
    </div>
  );
}
