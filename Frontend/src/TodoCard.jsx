import React, { useState } from 'react';
import { TiPencil } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import UpdateModal from './UpdateModal';

const TodoCard = ({ props, getdata }) => {
   const [showUpdateModal, setShowUpdateModal] = useState(false);
   const [currentTodo, setCurrentTodo] = useState(null); 
   const [isChecked, setIsChecked] = useState(props.isDone || false); 

   const closeUpdateModal = () => {
      setShowUpdateModal(false);
   };


   const handleCheckboxChange = async ()=>{
      console.log("checkbox click")
      try {
         const response = await axios.put(`http://localhost:3000/api/v1/isdone/${props._id}`,{
            isDone:true
         })
         setIsChecked(true)
         getdata()
         console.log(response.data)
      } catch (error) {
         console.log(error)
      }
   }

   const handleDelete = async () => {
      try {
         const response = await axios.delete(`http://localhost:3000/api/v1/todo/${props._id}`);
         console.log("Operation performed:", response.data.message || response.data);
         getdata(); 
      } catch (error) {
         console.error("Error deleting todo:", error);
      }
   };

   const handleUpdate = () => {
      setCurrentTodo(props); 
      setShowUpdateModal(true);
      console.log("Opening modal for todo ID:", props._id);
   };

   return (
      <div className='flex gap-5 w-full md:w-1/3 h-full bg-slate-50 p-2 rounded-md mb-5'>
         <input 
            className='rounded-full cursor-pointer' 
            type="checkbox" 
            checked={isChecked} 
            
            onChange={handleCheckboxChange}
            
         />
         <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col items-start'>
               <h1 className={`font-bold ${isChecked ? 'line-through text-gray-500' : ''}`}>
                  {props.title}
               </h1>
               <p className={`font-normal text-sm ${isChecked ? 'line-through text-gray-500' : ''}`}>
                  {props.description}
               </p>
               <p className={`font-normal text-sm ${isChecked ? 'line-through text-gray-500' : ''}`}>
                  {props.deadline}
               </p>
            </div>

            <div className='flex text-xl items-center justify-end gap-2'>
               <TiPencil onClick={handleUpdate} className='text-green-800 cursor-pointer' />
               <RiDeleteBinLine onClick={handleDelete} className='text-red-600 cursor-pointer' />
            </div>
         </div>

         {showUpdateModal && (
            <UpdateModal 
               todo={currentTodo}  
               showUpdateModal={showUpdateModal} 
               closeUpdateModal={closeUpdateModal} 
               getdata={getdata} 
            />
         )}
      </div>
   );
};

export default TodoCard;
