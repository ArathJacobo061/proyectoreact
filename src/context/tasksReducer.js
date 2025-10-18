export const initialState = {
  tasks: [],
  filter: "all",   // all | active | done
  query: "",
};

export function tasksReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, tasks: action.payload };

    case "ADD_TASK": {
      const newTask = { id: action.id, text: action.payload.text, done: false };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, done: !t.done } : t),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, text: action.payload.text } : t),
      };

    case "REMOVE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload.id) };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_QUERY":
      return { ...state, query: action.payload };

    default:
      return state;
  }
}
