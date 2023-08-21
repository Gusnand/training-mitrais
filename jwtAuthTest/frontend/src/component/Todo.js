import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Modal from './Modal'

const Todo = () => {
    const [todos, setTodos] = useState([])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [editingTodo, setEditingTodo] = useState(null)

    const fetchTodos = async() => {
      try {
          const response = await axios.get(`http://localhost:5000/todo/3`)
          setTodos(response.data)
      } catch (error) {
          console.log(error.message)
      }
    }

    useEffect(() => {
        fetchTodos()
    })

    const handleEditTodo = (todo) => {
      setEditingTodo(todo)
      setEditModalVisible(true)
    }

    const handleEditSubmit = async () => {
      try {
        await axios.post(`http://localhost:5000/todo/${updatedTodo.id}`, updatedTodo)
        fetchTodos()
        setEditModalVisible(false)
      } catch (error) {
        console.log(error.message);
      }
    }

    const getStatusString = (statusNumber) => {
        let statusString;
      
        if (statusNumber === 0) {
          statusString = 'Todo';
        } else if (statusNumber === 1) {
          statusString = 'In Progress';
        } else if (statusNumber === 2) {
          statusString = 'Done';
        } else {
          statusString = 'Unknown Status';
        }
    
        return statusString;
      };

    const handleDeleteTodo = async () => {
      try {
        await axios.delete(`http://localhost:5000/todo/${id}`)
        fetchTodos()
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10">
          <div className="card">
            <div className="card-header p-3">
              <h5 className="mb-0">
                <i className="fas fa-tasks me-2" />
                Task List
              </h5>
            </div>
            <div
              className="card-body"
              data-mdb-perfect-scrollbar="true"
              style={{ position: "relative", height: 400 }}>
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => {
                        return(
                            <tr className="fw-normal">
                                <td className="align-middle">
                                <span>{todo.title}</span>
                                </td>
                                <td className="align-middle">
                                <span>{todo.description}</span>
                                </td>
                                <td className="align-middle">
                                <h6 className="mb-0">
                                    <span className="badge bg-info">{getStatusString(todo.status)}</span>
                                </h6>
                                </td>
                                <td className="align-middle">
                                <span>{todo.deadline}</span>
                                </td>
                                <td className="align-middle">
                                <a href="#!" title="Done">
                                  <button className="btn btn-success">
                                      <i className="fas fa-check" />
                                  </button>
                              </a>

                              <a href="#!" title="Edit" onClick={() => handleEditTodo(todo.id)}>
                                  <button className="btn btn-warning">
                                      <i className="fas fa-edit" />
                                  </button>
                              </a>

                              <a href="#!" title="Remove">
                                  <button className="btn btn-danger">
                                      <i className="fas fa-trash-alt" />
                                  </button>
                              </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
              </table>
            </div>
            <div className="card-footer text-end p-3">
              <button className="btn btn-primary">Add Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal visible={editModalVisible} onClose={() => setEditModalVisible(false)} todo = {editingTodo}/>
  </section>
  
  )
}

export default Todo