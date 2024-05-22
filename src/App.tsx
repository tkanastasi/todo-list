import './App.css'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <>
      <div className="container-xxl">
        <div className="row mt-2">
          <div className="col">
            <h1>ToDo List</h1>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <TaskList />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
