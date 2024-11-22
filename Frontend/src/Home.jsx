import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { useNavigate } from 'react-router-dom';
import Todo from './Todo'; 
import axios from 'axios';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]); 

 
  const getdata = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/todo');
      // console.log(response.data.todo)
     
      if(!response.data){
        console.log("data not available")
      }
      if (response && response.data) {
        const todos = response.data.todo
        todos.sort((a,b) => a.isDone - b.isDone)
        setTodos(response.data.todo); 
      } else {
        console.log("Data can't be fetched");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata(); 
  }, []);

  const handleTodo = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="w-full h-screen px-10 md:px-32">
      <div className="2xl:w-1/2 h-full mx-auto text-center">
        <h1 className="mt-10 text-3xl font-bold">Todo</h1>
        <div className="w-95 h-auto bg-slate-400 rounded-md p-3 mt-10">
          <div className="flex justify-end">
            <button
              className="p-2 rounded-md bg-blue-500 font-medium text-white"
              onClick={handleTodo}
            >
              Create Todo
            </button>
          </div>
          <div className="flex flex-col items-center mt-2">
            
            {todos.length > 0 ? (
              todos.map((data) => (
                <TodoCard key={data._id} props={data} getdata={getdata} 
                showModal={showModal} setShowModal={setShowModal} closeModal={closeModal}
                />
              ))
            ) : (
              <p>No todos available</p> 
            )}
          </div>
        </div>
      </div>

     
      <Todo showModal={showModal} setShowModal={setShowModal} closeModal={closeModal} getdata={getdata}/>
    </div>
  );
};

export default Home;
