import { useState, useEffect } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const API_URL = "https://todo-app-server-d4zf.onrender.com/api/todos";

const AUTH_TOKEN = Math.random().toString(36).substring(2) + Date.now().toString(36);

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTodo, setEditTodo] = useState({ title: "", completed: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all Todos from the API
  const fetchTodos = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      console.log("Fetch Data", response.data);
      if (response.data.success) {
        setTodos(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false); // Set loading to false after the request is done
    }
  };

  // Add a new Todo
  const handleTodoAdd = async () => {
    if (!newTodo) return alert("Please enter a task name.");
    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { title: newTodo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      if (response.data.success) {
        fetchTodos(); // Get All Data from Server
        setNewTodo("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a Todo
  const handleTodoDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (response.data.success) {
        fetchTodos(); // Get all Data from Server
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Edit a Todo
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index]);
  };

  // Update a Todo
  const handleUpdateTodo = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/${id}`, editTodo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (response.data.success) {
        fetchTodos(); // Get all Latest Data
        setEditIndex(null);
        setEditTodo({ title: "", completed: "" });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-[100vh] bg-gray-300 flex flex-col items-center py-10">
      <div className="w-[90vw] md:w-[80vw] lg:w-[50vw] bg-slate-500 flex flex-col items-center text-white border-blue-200 p-10 rounded-lg">
        {/* Add Todo */}
        <div className="flex justify-center w-full gap-3 mb-5">
          <input
            type="text"
            placeholder="Enter Your Task Details..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="p-2 rounded-sm border border-gray-300 text-black"
          />
          <button
            className="bg-black p-2 rounded-sm text-white"
            onClick={handleTodoAdd}
          >
            + Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="bg-gray-600 w-full rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-white">
              <ClipLoader color="#ffffff" loading={loading} size={50} />
            </div>
          ) : todos.length === 0 ? (
            <div className="p-4 text-center text-white">
              No any Todo Data available
            </div>
          ) : (
            <table className="table-auto w-full text-left text-white">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-2">No</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Completed</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={todo.id} className="bg-gray-800 hover:bg-gray-700">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editTodo.title}
                          onChange={(e) =>
                            setEditTodo({ ...editTodo, title: e.target.value })
                          }
                          className="p-1 rounded-sm w-full text-black"
                        />
                      ) : (
                        todo.title
                      )}
                    </td>
                    <td className="p-2">
                      {editIndex === index ? (
                        <select
                          value={editTodo.completed}
                          onChange={(e) =>
                            setEditTodo({
                              ...editTodo,
                              completed: e.target.value,
                            })
                          }
                          className="pb-1 rounded-lg w-full bg-gray-600"
                        >
                          <option value="false">Pending</option>
                          <option value="true">Complete</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block px-1 rounded-lg ${
                            todo.completed === false
                              ? "bg-orange-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {todo.completed === false ? "Pending" : "Complete"}
                        </span>
                      )}
                    </td>

                    <td className="p-2 flex gap-2">
                      {editIndex === index ? (
                        <button
                          className="bg-blue-500 px-3 py-1 rounded-sm text-white"
                          onClick={() => handleUpdateTodo(todo.id)}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="text-yellow-500"
                          onClick={() => handleEditClick(todo._id)}
                        >
                          <AiOutlineEdit size={20} />
                        </button>
                      )}
                      <button
                        className="text-red-500"
                        onClick={() => handleTodoDelete(todo._id)}
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
