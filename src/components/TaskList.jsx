import api from "../api/axios";

export default function TaskList({ tasks, refresh }) {
  const toggleTask = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    refresh();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    refresh();
  };

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            style={{ textDecoration: task.completed ? "line-through" : "" }}
          >
            {task.title}
          </span>
          <div>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => toggleTask(task)}
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
