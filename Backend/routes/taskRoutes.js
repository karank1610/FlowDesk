const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protectRoute } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protectRoute, getTasks);
router.post('/', protectRoute, createTask);
router.patch('/:id', protectRoute, updateTask);
router.delete('/:id', protectRoute, deleteTask);

module.exports = router;