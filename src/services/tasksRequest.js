const BASE_URL =  import.meta.env.VITE_API_URL;

export async function fetchTasks() {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error("Failed to reload tasks");
        }

        return res.json()
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

export const createTask = async (task) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),

        });

        if (!res.ok) {
            throw new Error("Fieled to reload tasks", error.message);
        }

        return await res.json()
    } catch (error) {
        console.error(error);
        return null;
    }

}

export const updateTask = async (taskId, updatedTask) => {
    try {
        const res = await fetch(`${BASE_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });

        if (!res.ok) {
            throw new Error("Failed to update task", error.message);
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${BASE_URL}/${taskId}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
  
      return true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  