import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (!tasks.length) return <p className="empty-card">No hay tareas todavía</p>;
  return (
    <ul className="list">
      {tasks.map((t, i) => (
        <TaskItem
          key={t.id}
          task={t}
          style={{ animationDelay: `${i * 40}ms` }}  // ← pasamos delay aquí
        />
      ))}
    </ul>
  );
}
