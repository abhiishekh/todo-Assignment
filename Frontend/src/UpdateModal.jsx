import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateModal = ({ showUpdateModal, setShowUpdateModal, closeUpdateModal, getdata, todo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/todo/${todo._id}`, formData);
      console.log("Todo updated:", response.data);
      
      getdata();

      closeUpdateModal();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (!showUpdateModal) return null; 
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white w-96 h-auto p-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 mt-1 border rounded-md"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full p-2 mt-1 border rounded-md"
              required
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Deadline</label>
            <input
              type="date"
              required
              name="deadline"
              className="w-full p-2 mt-1 border rounded-md"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded-md font-medium mr-2 cursor-pointer"
              onClick={closeUpdateModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md font-medium cursor-pointer"
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
