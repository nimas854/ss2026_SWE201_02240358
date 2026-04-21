import React, { useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const completedCount = tasks.filter((task) => task.done).length;
  const pendingCount = tasks.length - completedCount;
  const highPriorityCount = tasks.filter(
    (task) => task.priority === "high",
  ).length;

  useEffect(() => {
    document.title = `Tasks: ${tasks.length}`;
  }, [tasks.length]);

  useEffect(() => {
    if (tasks.length > 0) {
      console.log(`Task count changed: ${tasks.length}`);
    }
  }, [tasks.length]);

  const handleAddTask = (task) => {
    dispatch({
      type: "ADD_TASK",
      task: {
        ...task,
        done: false,
      },
    });
  };

  const handleToggleTask = (id) => {
    dispatch({ type: "TOGGLE_DONE", id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", id });
  };

  const handleClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  return (
    <div className="app-shell" data-theme={theme}>
      <main className="board">
        <Header />

        <section className="hero">
          <h2>Build the board step by step</h2>
          <p>
            The app keeps task input local with <code>useState</code>, persists
            state with
            <code>useEffect</code>, shares theme through <code>useContext</code>
            , manages task transitions with <code>useReducer</code>, and reuses
            storage logic through custom hooks.
          </p>
          <div className="hero-grid">
            <div className="hero-card">
              <span className="hero-label">Total tasks</span>
              <strong className="hero-value">{tasks.length}</strong>
            </div>
            <div className="hero-card">
              <span className="hero-label">Completed</span>
              <strong className="hero-value">{completedCount}</strong>
            </div>
            <div className="hero-card">
              <span className="hero-label">High priority</span>
              <strong className="hero-value">{highPriorityCount}</strong>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <h3 className="panel-title">Controls</h3>
            <ThemeToggleButton />
          </div>
          <div className="controls">
            <span className="badge">Pending: {pendingCount}</span>
            <span className="badge">Done: {completedCount}</span>
            <button
              type="button"
              className="clear-button"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </div>
          <TaskInput onAddTask={handleAddTask} />
        </section>

        <section className="panel">
          <div className="panel-head">
            <h3 className="panel-title">Tasks</h3>
            <span className="task-meta">
              Stored in localStorage and restored on reload
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              No tasks yet. Add one above to see the board in action.
            </div>
          ) : (
            <ul className="list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`list-item ${task.done ? "done" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                    aria-label={`Mark ${task.title} as ${task.done ? "not done" : "done"}`}
                  />
                  <div className="task-content">
                    <span className={`task-title ${task.done ? "done" : ""}`}>
                      {task.title}
                    </span>
                    <div className="task-badges">
                      <span className={`badge priority-${task.priority}`}>
                        {task.priority}
                      </span>
                      <span className="badge">ID {task.id}</span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      type="button"
                      className="task-button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
