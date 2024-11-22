const express = require('express');
const { todoModule } = require('../db/db');

const router = express.Router()


router.post('/todo',async function(req,res){
    const title = req.body.title;
    const description = req.body.description
    const deadline = req.body.deadline

    if(!title || !description){
        return res.status(400).json({
            message:"Title and Description is are required"
        })
    }
    try {
        
        const response = await todoModule.create({
            title:title,
            description:description,
            deadline:deadline
        })
    
        if(!response){
            return res.status(500).jaon({
                message:"server error"
            })
        }

        res.status(201).json({
            response
        })
    } catch (error) {
        return error
    }

})

router.get('/todo',async function(req,res){

    const todo = await todoModule.find()
    try {
        if(!todo){
            return res.status(404).json({
                messages:"data not found"
            })
        }
        res.status(200).json({
            todo
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
})
router.get('/todo/:id', async function(req, res) {
    const id = req.params.id;

    try {
        const todo = await todoModule.findById(id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }     
        return res.json(todo);

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/todo/:id', async function(req, res) {
    const id = req.params.id;
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({
            message: "Title, description, and deadline are required"
        });
    }

    try {
        const updatedTodo = await todoModule.findByIdAndUpdate(
            id, 
            {  
                title: title,
                description: description,
                deadline: deadline,
            },
            { new: true }  
        );

        
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found with the given ID"
            });
        }

       
        res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo
        });

    } catch (error) {
    
        console.error(error);
        res.status(500).json({
            message: "Error updating Todo",
            error: error.message
        });
    }
});
router.put('/isdone/:id', async function(req, res) {
    const id = req.params.id;
    const { isDone } = req.body;

    try {
        const updatedTodo = await todoModule.findByIdAndUpdate(
            id, 
            {  
                isDone:isDone
            },
            { new: true }  
        );      
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found with the given ID"
            });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            updatedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating Todo",
            error: error.message
        });
    }
});
router.delete('/todo/:id',async function(req,res){
    const id = req.params.id
    try {
        const response = await todoModule.findByIdAndDelete(id)
    
        if(!response){
            return res.status(404).json({
                message:"Todo not found with the given id"
            })
        }
        res.status(201).json({
            message:"Todo deleted"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"somthing went wrong",
            error
        })
    }

})


router.get('/',function(req,res){
    res.send("backend is working")
})

module.exports  = router