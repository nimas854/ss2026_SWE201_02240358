export const initialTaskState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task,
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.done),
      };
    default:
      return state;
  }
}
