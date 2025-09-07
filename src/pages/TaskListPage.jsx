import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import TaskTable from "../components/TaskTable"; // import the new table


const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/tasks/taskList");
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (task) => {
    try {
      await axiosInstance.put(`/api/tasks/${task.id}`, {
        ...task,
        status: task.status === "DONE" ? "PENDING" : "DONE",
      });
      await fetchTasks();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axiosInstance.delete(`/api/tasks/${task.id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (task) => {
    // you can later open a modal or navigate to an edit page
    console.log("Edit clicked:", task);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Tasks</h2>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <TaskTable
          tasks={tasks}
          loading={loading}
          onToggleCompleted={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default TaskListPage;
