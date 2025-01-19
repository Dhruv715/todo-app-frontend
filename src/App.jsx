import { Route, Routes } from 'react-router-dom';
import './App.css'
import Todo from './pages/Todo';

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={ <Todo/>} />
      </Routes>
    </>
  )
}

export default App
