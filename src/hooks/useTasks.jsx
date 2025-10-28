import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../lib/supabaseClient";

const useTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks based on user id and sort option
  const fetchTasks = async (sortOption = "default") => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from("tasks").select("*").eq("user_id", user.id);
      switch (sortOption) {
        case "urgents":
          query = query.order("priority", { ascending: true });
          break;
        case "default":
          query = query.order("created_at", { ascending: false });
          break;
        case "a-z":
          query = query.order("title", { ascending: true });
          break;
        case "deadline":
          query = query.order("deadline", {
            ascending: true,
            nullsFirst: false,
          });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new task
  const createTask = async (task) => {
    if (!user) return null;
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([{ ...task, user_id: user.id }])
        .select();

      if (error) throw error;

      const newTask = data[0];
      setTasks((prev) => [...prev, newTask]);

      return newTask;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const updateTask = async (task) => {
    if (!user) return null;
    setLoading(true);
    setError(null);

    const { id, ...taskToUpdate } = task;
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(taskToUpdate)
        .eq("id", id)
        .select();

      if (error) throw error;

      const updatedTask = data[0];
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));

      return updatedTask;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    if (!user) return false;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      setTasks((prev) => prev.filter((t) => t.id !== id));

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear archived tasks
  const clearArchivedTasks = async (completedTasks) => {
    if (!user) return false;
    setLoading(true);
    setError(null);

    try {
      const idsToDelete = completedTasks.map((t) => t.id);

      const { error } = await supabase
        .from("tasks")
        .delete()
        .in("id", idsToDelete);

      if (error) throw error;

      setTasks((prev) => prev.filter((t) => !t.completed));

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearArchivedTasks,
  };
};

export default useTasks;
