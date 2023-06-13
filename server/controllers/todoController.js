const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');

/**
 * @desc For crate task
 * @route /api/task
 * @access Public
 */
exports.createTask = asyncHandler(async (req, res) => {
    const { task, active, dueDate } = req.body
    const todo = await Todo.create({ task, active, dueDate });
    res.status(200).json({
        sucess: true,
        data: todo,
        message: 'Task is created sucessfully'
    })
})

/**
 * @desc For Update Task
 * @route /api/task/:id
 * @access Public
 */
exports.updateTask = asyncHandler(async (req, res) => {
    const { task, active, dueDate } = req.body
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        existTask.task = task;
        existTask.active = active;
        existTask.dueDate = dueDate;
        const updatedTask = await existTask.save();
        res.status(200).json({
            success: true,
            data: updatedTask,
            message: 'Task is updated successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }
})

/**
 * @desc For Delete Task
 * @route /api/task/:id
 * @access Public
 */
exports.deleteTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: 'Task is deleted successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }

})

/**
 * @desc For Get Single Task
 * @route /api/task/:id
 * @access Public
 */
exports.getSingleTask = asyncHandler(async (req, res) => {
    const existTask = await Todo.findOne({ _id: req.params.id })
    if (existTask) {
        res.status(200).json({
            success: true,
            data: existTask,
            message: 'Task is fetched successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task is Not Found'
        })
    }

})

/**
 * @desc For Get all Tasks
 * @route /api/task
 * @access Public
 */
exports.getAllTasks = asyncHandler(async (req, res) => {
    const search = req.query.search;

    const query = {}

    if (search) {
        const searchTerms = search.split(" ");

        query.task = { $regex: new RegExp(searchTerms.join("|")) };
    }
    const allTasks = await Todo.find(query)
    if (allTasks) {
        res.status(200).json({
            success: true,
            data: allTasks,
            message: 'All Tasks are fetched successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Task are Not Found'
        })
    }

})