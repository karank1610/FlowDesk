const Task = require("../models/task");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "failed to fetch tasks", error });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required!" });
        }

        const newTask = new Task({
            userId: req.user._id,
            title,
            description,
            priority,
            dueDate,
            status
        });

        await newTask.save();

        res.status(201).json({ message: "Task created successfully!", task: newTask });

    } catch (error) {
        res.status(500).json({ message: "Error creating task!", error });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, status } = req.body;

        const task = await Task.findOne({ _id: id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();

        res.status(200).json({ message: "Task updated successfully!", task });

    } catch (error) {
        res.status(500).json({ message: "Error updating task!", error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, userId: req.user._id });

        if (!task) {
            return res.status(404).json({ message: "Task not found!" });
        }

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting task!", error });
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
