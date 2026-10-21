
const express = require('express');
const verifyToken = require('../Middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../Controller/TaskController');

const router = express.Router();
router.use(verifyToken);   // All task route require the user to be logged in 

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;