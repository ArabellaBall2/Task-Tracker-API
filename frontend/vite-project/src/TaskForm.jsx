import { useState } from "react";
import Message from "./Message";

function TaskForm({ onAdd, token }) {
    const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function submit(e) {

        e.preventDefault();
        if (loading) return;
        if (!title.trim()) return;

        setLoading(true);
        setError(null);

            try {
                const res = await fetch(`${API}/api/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({ title: title.trim() }),
                });

                if (!res.ok) {
                    const errText = await res.text().catch(() => res.statusText);
                    throw new Error(errText || `Failed to create task (${res.status})`);
                }

                const task = await res.json();
            onAdd(task);
            setTitle("");

        } catch (err) {
            setError(err.message || "Error");
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={submit}>
            <input
                value={title}
                placeholder="New Task"
                onChange={(e) => setTitle(e.target.value)}
            />

            <button disabled={!title.trim()}>
                Add Task
            </button>

            {error && <Message text={error} />}
        </form>
    );

}

export default TaskForm;