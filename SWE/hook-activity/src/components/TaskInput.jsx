import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onAddTask({
      id: Date.now(),
      title: trimmedTitle,
      priority,
    });

    setTitle("");
    setPriority("normal");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <div className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Task title"
        />
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          aria-label="Task priority"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add task</button>
        <button type="button" onClick={() => setTitle("")}>
          Clear
        </button>
      </div>
      <div className="preview">
        Preview: {title || "(empty)"} · priority {priority}
      </div>
    </form>
  );
}

export default TaskInput;
