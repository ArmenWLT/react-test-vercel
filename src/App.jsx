import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ToDo from './components/ToDo/ToDo';
import TaskCard from './components/TaskCard/TaskCard';
import EditTaskCard from './components/EditTaskCard/EditTaskCard';
import "./App.css";
import { useEffect, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
} from './services/tasksRequest';

function App() {
  const [isToDoShow, setIsToDoShow] = useState(false);
  const [isTaskEdit, setTaskEdit] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState(null);
  const [info, setInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [theme, setTheme] = useState('light');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const loadTask = async () => {
      const data = await fetchTasks();
      setInfo(data);
    };

    loadTask();
  }, []);

  const toggleShowModal = () => {
    setIsToDoShow((prevState) => !prevState);
  };

  const toggleShowEdit = () => {
    setTaskEdit((prevState) => !prevState);
  };

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData);
    if (newTask) {
      setInfo((prevInfo) => [...prevInfo, newTask]);
    }
    setIsToDoShow(false);
  };

  const openEditTaskModal = (taskId) => {
    const task = info.find((taskItem) => taskId === taskItem.id);
    if (!task) {
      console.error("Task not found");
      return;
    }

    setTaskEdit(true);
    setTaskForEdit(task);
  };

  const updateTask = async (updatedTask) => {
    const updated = await updateTaskAPI(updatedTask.id, updatedTask);
    if (updated) {
      setInfo((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updated.id ? { ...task, ...updated } : task
        )
      );
    }
    setTaskEdit(false);
    setTaskForEdit(null);
  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const success = await deleteTaskAPI(taskId);
      if (success) {
        setInfo((prev) => prev.filter((task) => task.id !== taskId));
      } else {
        alert("Failed to delete the task");
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const taskToUpdate = info.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updated = await updateTaskAPI(taskId, { ...taskToUpdate, status: newStatus });
    if (updated) {
      setInfo((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const filteredTasks = info.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddTaskClick={toggleShowModal}
        isToDoShow={isToDoShow}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />

      <div style={{ marginTop: '32px' }} className='cardsContainer'>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item) => (
            <TaskCard
              key={item.id}
              task={item}
              onEdit={openEditTaskModal}
              onDelete={deleteTask}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div style={{ padding: '12px', color: '#6b7280' }}>
            No tasks found.
          </div>
        )}
      </div>

      {isToDoShow && (
        <ToDo
          handleShowInfo={toggleShowModal}
          handleAddTask={addTask}
        />
      )}

      {taskForEdit && isTaskEdit && (
        <EditTaskCard
          taskInfo={taskForEdit}
          handleShowInfo={toggleShowEdit}
          onSave={updateTask}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
