import { useEffect, useReducer } from "react";
import { initialTaskState, taskReducer } from "../reducers/taskReducer";

const TASK_STORAGE_KEY = "activity.tasks";

function readTasksFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState,
    (initialState) => ({
      ...initialState,
      tasks: readTasksFromStorage(),
    }),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        TASK_STORAGE_KEY,
        JSON.stringify(state.tasks),
      );
    } catch {
      // Ignore storage failures in constrained environments.
    }
  }, [state.tasks]);

  return { tasks: state.tasks, dispatch };
}
