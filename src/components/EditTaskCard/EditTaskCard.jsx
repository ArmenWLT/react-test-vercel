import { useState } from "react";
import styles from "./EditTaskCard.module.css";

function EditTaskCard({ taskInfo, handleShowInfo, onSave }) {
    const [title, setTitle] = useState(taskInfo.title || "");
    const [description, setDescription] = useState(taskInfo.description || "");
    const [startDate, setStartDate] = useState(taskInfo.startDate || "");
    const [finishDate, setFinishDate] = useState(taskInfo.finishDate || "");

    const handleSave = () => {
        if (!title.trim()) {
            alert("Task title cannot be empty");
            return;
        }

        onSave({
            id: taskInfo.id,
            title: title.trim(),
            description: description.trim(),
            startDate,
            finishDate
        });

        handleShowInfo();
    };

    return (
        <div className={styles.modalOverlay} onClick={handleShowInfo}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Edit Task</h2>
                    <button className={styles.closeButton} onClick={handleShowInfo}>
                        &times;
                    </button>
                </div>

                <div className={styles.formBody}>
                    <div className={styles.inputGroup}>
                        <label>Task Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className={styles.textInput}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description"
                            className={styles.textareaInput}
                            rows={4}
                        />
                    </div>

                    <div className={styles.dateRow}>
                        <div className={styles.inputGroup}>
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={styles.dateInput}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Due Date</label>
                            <input
                                type="date"
                                value={finishDate}
                                onChange={(e) => setFinishDate(e.target.value)}
                                className={styles.dateInput}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button className={styles.secondaryButton} onClick={handleShowInfo}>
                        Cancel
                    </button>
                    <button className={styles.primaryButton} onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTaskCard;