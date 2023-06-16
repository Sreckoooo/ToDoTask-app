const express = require('express');
const router = express.Router();

const {createTime, updateTime, deleteTime, getSingleTime, getAllTimes} = require('../controllers/ureController');

router.route('/').post(createTime);
router.route('/:id').put(updateTime);
router.route('/:id').delete(deleteTime);
router.route('/:id').get(getSingleTime);
router.route('/').get(getAllTimes);

module.exports = router