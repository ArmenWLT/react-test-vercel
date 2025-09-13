import { useState } from "react";
import styles from "./ToDo.module.css"

function ToDo({ handleShowInfo, handleAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);

    }

    const handleDescripChage = (event) => {
        setDescription(event.target.value);
    }

    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    }

    const handleFinishDate = (event) => {
        setFinishDate(event.target.value);
    }

    const handleAddClick = () => {
        handleAddTask({
                title,
                description,
                startDate,
                finishDate
            }
        )

        setTitle("");
        setDescription("");
        setStartDate("");
        setFinishDate("");
    }

    return (
        <div className={styles.section} onClick={handleShowInfo}>
            <div className={styles.card }
            onClick={(e)=>e.stopPropagation()}
            >
                <h1 className={styles.cardTitle}>Task</h1>
                <input
                    onChange={handleTitleChange}
                    value={title}
                    name="title"
                    type="text"
                    className={styles.title}
                    placeholder="Title"
                />
                <textarea
                    onChange={handleDescripChage}
                    value={description}
                    name="Description"
                    rows={3}
                    className={styles.description}
                    placeholder="Description"
                />
                <div>
                    <label className={styles.label}>
                        Start date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDate}
                        />
                    </label>
                    <label className={styles.label}>
                        Finish  date:
                        <input
                            type="date"
                            value={finishDate}
                            onChange={handleFinishDate}
                        />
                    </label>
                </div>
                <button
                    className={styles.add}
                    onClick={handleAddClick}>
                    Add
                </button>
            </div>
        </div>

    )
}

export default ToDo;