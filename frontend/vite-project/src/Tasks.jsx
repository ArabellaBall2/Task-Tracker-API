import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Tasks({ token }) {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          setTasks([]);
          return;
        }
        const res = await fetch(`${API}/api/tasks`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) {
          const errText = await res.text().catch(() => res.statusText);
          throw new Error(errText || `${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [token]);

  function handleAdd(newTask) {
    // append task returned from server
    setTasks((prev) => [newTask, ...prev]);
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggle(id) {
    const task = tasks.find((t) => (t._id || t.id) === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update");
      const body = await res.json();
      setTasks((prev) => prev.map((t) => ((t._id || t.id) === id ? body : t)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleEdit(id, title) {
    const task = tasks.find((t) => (t._id || t.id) === id);
    if (!task) return;
    const updated = { ...task, title };
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const body = await res.json();
      setTasks((prev) => prev.map((t) => ((t._id || t.id) === id ? body : t)));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="tasks-section">
      <h2>Your Tasks</h2>
      <TaskForm onAdd={handleAdd} token={token} />
      {loading && <div>Loading tasks...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit} />}
    </section>
  );
}

export default Tasks;
