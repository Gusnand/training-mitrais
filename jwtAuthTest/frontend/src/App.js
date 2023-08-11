import React, {useState} from "react";
import Header from "./component/Header";
import "./App.css"
import Form from "./component/Form"

const App = () => {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState([])
  return (
    <div className="container">
        <div className="app-wrapper">
          <div>
            <Header/>
          </div>
          <div>
            <Form 
            input = {input}
            setInput = {setInput}
            todos = {todos}
            setTodos = {setTodos}
            />
          </div>
        </div>
    </div>
  );
}

export default App;
