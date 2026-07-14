import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const id = task._id || task.id;

  function handleSave() {
    const trimmed = title.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setIsEditing(false);
  }

  return (
    <li>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle(id)}
        />
        <span className="checkmark"></span>
      </label>

      {isEditing ? (
        <input
          className="task-edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setTitle(task.title || "");
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span className={task.completed ? "task-completed" : ""}>{task.title}</span>
      )}

      <div className="task-actions">
        {isEditing ? (
          <button type="button" onClick={handleSave}>Save</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;