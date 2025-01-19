import './App.css'
import Todo from './pages/Todo';

function App() {

  // Get API - Get all Todo Details
  // GET -https://todo-app-server-d4zf.onrender.com/api/todos
  // Pass authorization Token in Header That is random Token

  // POST API -Add Todo Details
  // POST -https://todo-app-server-d4zf.onrender.com/api/todos
  // body data :  {
  //   "title" : "Task Name"
  // }
  // Pass authorization Token in Header That is random Token

  // Update API - Update Todo API
  // PUT -https://todo-app-server-d4zf.onrender.com/api/todos/:ID
  // body data :  {
  //   "title" : "Task Name",
  //    "status" : false True
  // }
  // Pass authorization Token in Header That is random Token

  // Delete API - Delete Todo API
  // DELETE -https://todo-app-server-d4zf.onrender.com/api/todos/:ID
  // Pass authorization Token in Header That is random Token

  return (
    <>
    <Todo/>
    </>
  )
}

export default App
