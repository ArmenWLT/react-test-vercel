import React, { useState } from 'react';
import styles from './TaskCard.module.css';

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusClass = (status) => {
    if (status === 'completed') return 'stepper-completed';
    if (status === 'in progress') return 'stepper-active';
    return 'stepper-pending';
  };

  const statusClass = getStatusClass(task.status);

  return (
    <div className={styles["stepper-box"]}>
      <div className={`${styles["stepper-step"]} ${styles[statusClass]}`}>
        <div className={styles["stepper-circle"]}>
          {task.title?.[0] || '?'}
        </div>
        <div className={styles["stepper-content"]}>
          <div className={styles["stepper-title"]}>{task.title}</div>

          <div
            className={`${styles["stepper-description"]} ${expanded ? styles["expanded"] : ""}`}
            onClick={() => setExpanded(!expanded)}
            title="Click to expand"
          >
            {task.description || 'No description'}
          </div>

          <div className={styles["stepper-time-range"]}>
            {task.startDate ? formatDate(task.startDate) : ''} – {task.finishDate ? formatDate(task.finishDate) : ''}
          </div>

          <div className={styles["stepper-time"]}>{formatDate(task.date)}</div>
          <div className={styles["stepper-status"]}>{task.status}</div>

          <div className={styles["stepper-controls"]}>
            <button className={styles["stepper-button"]} onClick={() => onEdit(task.id)}>Edit</button>
            <button className={styles["stepper-button"]} onClick={() => onDelete(task.id)}>Delete</button>
            <select
              className={styles["stepper-button"]}
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
