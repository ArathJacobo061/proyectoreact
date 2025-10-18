import { tasksReducer, initialState } from "../tasksReducer";

const base = {
  ...initialState,
  tasks: [{ id: "1", text: "hola", done: false }],
};

test("ADD_TASK agrega al inicio", () => {
  const action = { type: "ADD_TASK", id: "2", payload: { text: "nueva" } };
  const next = tasksReducer(base, action);
  expect(next.tasks[0]).toMatchObject({ id: "2", text: "nueva", done: false });
  expect(next.tasks).toHaveLength(2);
});

test("TOGGLE_TASK invierte done", () => {
  const next = tasksReducer(base, { type: "TOGGLE_TASK", payload: { id: "1" } });
  expect(next.tasks[0].done).toBe(true);
});

test("UPDATE_TASK cambia el texto", () => {
  const next = tasksReducer(base, { type: "UPDATE_TASK", payload: { id: "1", text: "editada" } });
  expect(next.tasks[0].text).toBe("editada");
});

test("REMOVE_TASK elimina por id", () => {
  const next = tasksReducer(base, { type: "REMOVE_TASK", payload: { id: "1" } });
  expect(next.tasks).toHaveLength(0);
});
