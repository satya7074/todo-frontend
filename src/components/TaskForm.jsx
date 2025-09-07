import { useState } from "react";
import api from "../api/axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    setTitle("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-success">Add</button>
    </form>
  );
}
