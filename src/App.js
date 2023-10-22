import React from "react";
import { useState } from "react";
import CustomNavbar from "./layout/navbar/CustomNavbar";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle.js";
// import "bootstrap/dist/js/bootstrap.js";

import "./App.css";
function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Toi di hoc",
      completed: false,
    },
    {
      id: 2,
      title: "Toi di choi da banh",
      completed: false,
    },
    {
      id: 3,
      title: "Toi xem phim",
      completed: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [autoId, setAutoId] = useState(3);

  const genId = () => {
    setAutoId((preAutoId) => preAutoId + 1);
    return autoId + 1;
  };
  const onDeleteClick = (id) => {
    setTodos([...todos.filter((item) => item.id !== id)]);
  };

  const onSubmit = () => {
    setTodos([...todos, { id: genId(), title: title, completed: false }]);
    setTitle("");
  };
  const onInputChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <CustomNavbar></CustomNavbar>
      {/* <CustomInputSearch value={title} inputChange={onInputChange} />
      <CustomButton name={"Add todo"} click={onSubmit} /> */}
      {/* <ul>
        {todos &&
          todos.map((item) => (
            <li key={item.id}>
              <input type="checkbox" />
              <span>{item.title}</span>
              <button
                onClick={() => {
                  onDeleteClick(item.id);
                }}
              >
                &times;
              </button>
            </li>
          ))}
      </ul> */}
    </>
  );
}

export default App;
