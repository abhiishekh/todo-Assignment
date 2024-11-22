import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Todo = ({props, showModal, closeModal, getdata}) => {
  const [formdata, setFormData] = useState({
    title:'',
    description:'',
    deadline:''
  })

  const handleChange =(e)=>{
      const {name, value} = e.target

      setFormData({
        ...formdata,
        [name]:value
      })
  }
  const handleUpdate =()=>{
    
  }
  useEffect(()=>{
    if(props){
      setFormData({
        title:props.title,
        description:props.description,
        deadline:props.deadline
      })
    }
  },[props])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/todo',
        formdata
      );
      console.log(response.data.response); 
      getdata()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setFormData([''])
    closeModal(); 
  };

  if (!showModal) return null; 
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-5">
      <div className="bg-white w-96 h-auto p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name='title'
              required
              className="w-full p-2 mt-1 border rounded-md"
              value={formdata.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 mt-1 border rounded-md"
              required
              rows="3"
              name='description'
              value={formdata.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Deadline</label>
            <input
              type="date"
              required
              name='deadline'
              className="w-full p-2 mt-1 border rounded-md"
              value={formdata.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white p-2 rounded-md font-medium mr-2 cursor-pointer"
              onClick={closeModal} 
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md font-medium cursor-pointer"
            >
              Save Todo
            </button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default Todo;
