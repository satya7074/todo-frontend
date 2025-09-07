import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../api/axiosInstance";
import "./TaskTable.css";

const PAGE_SIZES = [5, 10, 20];

function Badge({ status }) {
  const map = {
    PENDING: "badge bg-secondary",
    IN_PROGRESS: "badge bg-warning text-dark",
    DONE: "badge bg-success",
  };
  return <span className={map[status] || "badge bg-info"}>{status}</span>;
}

function PriorityPill({ priority }) {
  const map = {
    LOW: "priority-pill low",
    MEDIUM: "priority-pill medium",
    HIGH: "priority-pill high",
    CRITICAL: "priority-pill critical",
  };
  return <span className={map[priority] || "priority-pill"}>{priority}</span>;
}

/**
 * TaskTable
 *
 * Props:
 *  - tasks: array of task objects
 *  - loading: boolean
 *  - onToggleCompleted(task) optional -> toggle completed
 *  - onEdit(task) optional -> open edit UI
 *  - onDelete(task) optional -> delete action
 *
 * Task shape assumed:
 *   { id, title, description, status, priority, dueDate, createdAt, userId }
 */
export default function TaskTable({
  tasks = [],
  loading = false,
  onToggleCompleted,
  onEdit,
  onDelete,
}) {
  // ui state
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(PAGE_SIZES[0]);
  const [sortBy, setSortBy] = useState({ key: "createdAt", dir: "desc" });

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase();
    let arr = tasks.slice();

    if (lower) {
      arr = arr.filter(
        (t) =>
          (t.title || "").toLowerCase().includes(lower) ||
          (t.description || "").toLowerCase().includes(lower) ||
          (t.userId || "").toLowerCase().includes(lower)
      );
    }

    const key = sortBy.key;
    arr.sort((a, b) => {
      const A = a[key] ?? "";
      const B = b[key] ?? "";
      if (A === B) return 0;
      if (sortBy.dir === "asc") return A > B ? 1 : -1;
      return A < B ? 1 : -1;
    });

    return arr;
  }, [tasks, q, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / size));
  const currentPage = Math.min(page, totalPages - 1);

  const pageItems = filtered.slice(currentPage * size, currentPage * size + size);

  const changeSort = (key) => {
    setSortBy((s) =>
      s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  // default handlers if not provided (use axios to call API)
  const defaultToggle = async (task) => {
    try {
      const updated = { ...task, status: task.status === "DONE" ? "PENDING" : "DONE" };
      await axiosInstance.put(`/api/tasks/${task.id}`, updated);
      // best to let parent refresh; optimistic local updates are possible
    } catch (err) {
      console.error("toggle failed", err);
      alert("Failed to toggle task");
    }
  };

  const defaultDelete = async (task) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axiosInstance.delete(`/api/tasks/${task.id}`);
    } catch (err) {
      console.error("delete failed", err);
      alert("Failed to delete task");
    }
  };

  const handleToggle = (task) => {
    (onToggleCompleted || defaultToggle)(task);
  };

  const handleEdit = (task) => {
    (onEdit || (() => {}))(task);
  };

  const handleDelete = (task) => {
    (onDelete || defaultDelete)(task);
  };

  return (
    <div className="task-table-wrapper card shadow-sm">
      <div className="card-body">
        <div className="table-controls d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 gap-2">
          <div className="d-flex gap-2 w-100 w-md-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Search title, description or user..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
            />
            <select
              className="form-select"
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(0);
              }}
              aria-label="Page size"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} / page
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <small className="text-muted">
              {filtered.length} task{filtered.length !== 1 ? "s" : ""} found
            </small>
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                  >
                    Prev
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">
                    {currentPage + 1} / {totalPages}
                  </span>
                </li>
                <li className={`page-item ${currentPage >= totalPages - 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h5>No tasks found</h5>
            <p className="small">Create new tasks to get started.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 40 }} />
                  <th onClick={() => changeSort("title")} className="sortable">
                    Title {sortBy.key === "title" && (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="d-none d-md-table-cell" onClick={() => changeSort("description")}>
                    Description {sortBy.key === "description" && (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => changeSort("status")}>
                    Status {sortBy.key === "status" && (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => changeSort("priority")} className="d-none d-md-table-cell">
                    Priority {sortBy.key === "priority" && (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => changeSort("dueDate")} className="d-none d-lg-table-cell">
                    Due
                    {sortBy.key === "dueDate" && (sortBy.dir === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="d-none d-lg-table-cell">Owner</th>
                  <th style={{ width: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((task) => (
                  <tr key={task.id || task._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.status === "DONE"}
                        onChange={() => handleToggle(task)}
                        title="Mark complete"
                      />
                    </td>
                    <td>
                      <div className="fw-semibold">{task.title}</div>
                      <div className="small text-muted d-md-none">{task.description}</div>
                    </td>
                    <td className="d-none d-md-table-cell text-truncate" style={{ maxWidth: 300 }}>
                      {task.description}
                    </td>
                    <td>
                      <Badge status={task.status} />
                    </td>
                    <td className="d-none d-md-table-cell">
                      <PriorityPill priority={task.priority || "MEDIUM"} />
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="d-none d-lg-table-cell">
                      <small className="text-muted">{task.userId || task.owner || "me"}</small>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(task)}
                          title="Edit task"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(task)}
                          title="Delete task"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer small text-muted">
        Showing {pageItems.length} of {filtered.length} task{filtered.length !== 1 ? "s" : ""}.
      </div>
    </div>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
