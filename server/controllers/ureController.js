const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Ure = require("../models/ureModel");

/**
 * @desc For crate time
 * @route /api/time
 * @access Public
 */
exports.createTime = asyncHandler(async (req, res) => {
    const { taskid, date, time} = req.body
    const ure = await Ure.create({ taskid, date, time, updatedDate:new Date(), createdDate:new Date() });
    res.status(200).json({
        sucess: true,
        data: ure,
        message: 'Time is created sucessfully'
    })
})

/**
 * @desc For Update Time
 * @route /api/time/:id
 * @access Public
 */
exports.updateTime = asyncHandler(async (req, res) => {
    const { taskid, date, time, createdDate} = req.body
    const existTime = await Ure.findOne({ _id: req.params.id })
    if (existTime) {
        existTime.taskid = taskid;
        existTime.date = date;
        existTime.time = time;
        existTime.updatedDate = new Date();
        existTime.createdDate = createdDate;
        const updatedTime = await existTime.save();
        res.status(200).json({
            success: true,
            data: updatedTime,
            message: 'Time is updated successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Time is Not Found'
        })
    }
})

/**
 * @desc For Delete Time
 * @route /api/time/:id
 * @access Public
 */
exports.deleteTime = asyncHandler(async (req, res) => {
    const existTime = await Ure.findOne({ _id: req.params.id })
    if (existTime) {
        await Ure.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: 'Time is deleted successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Time is Not Found'
        })
    }

})

/**
 * @desc For Get Single Time
 * @route /api/time/:id
 * @access Public
 */
exports.getSingleTime = asyncHandler(async (req, res) => {
    const existTime = await Ure.findOne({ _id: req.params.id })
    if (existTime) {
        res.status(200).json({
            success: true,
            data: existTime,
            message: 'Time is fetched successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Time is Not Found'
        })
    }

})

/**
 * @desc For Get all Times
 * @route /api/time
 * @access Public
 */
exports.getAllTimes = asyncHandler(async (req, res) => {
    const taskid = req.query.taskid;

    const query = {}

    if (taskid) {

        query.taskid = new mongoose.Types.ObjectId(taskid);
    }
    const allTimes = await Ure.find(query)
    if (allTimes) {
        res.status(200).json({
            success: true,
            data: allTimes,
            message: 'All Times are fetched successfully'
        })
    } else {
        res.status(401).json({
            success: false,
            data: null,
            message: 'Time are Not Found'
        })
    }

})