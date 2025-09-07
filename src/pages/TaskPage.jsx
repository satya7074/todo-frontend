import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Tasks</h2>
      <TaskForm refresh={fetchTasks} />
      <TaskList tasks={tasks} refresh={fetchTasks} />
    </div>
  );
}
