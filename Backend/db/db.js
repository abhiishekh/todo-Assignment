const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema



const todo = new Schema({
    title: String,
    description: String,
    deadline: Date,
    isDone: { type: Boolean, default: false }
})


const todoModule = mongoose.model('Todo',todo)

module.exports = {
    todoModule
}