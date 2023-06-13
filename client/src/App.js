import React, { useState } from "react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const queryClient = new QueryClient();

function App() {
  const [todos, setTodos] = useState([]);

  const addTask = (task, dueDate) => {
    setTodos((prevTodos) => [...prevTodos, task, dueDate]);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home onTaskAdd={addTask} />}/>
            <Route path="/Tasks" element={<Tasks todos={todos} />}/>
          </Routes>
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
