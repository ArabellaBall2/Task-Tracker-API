const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authenticateToken = require("../middleware/authMiddleware");



// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

//create a new task
router.post("/", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user._id });
  await task.save();
  res.status(201).json(task);
});

// Update a task
router.put("/:id", authenticateToken, async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  await task.save();
  res.json(task);
});

// Delete a task
router.delete("/:id", authenticateToken, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  await task.remove();
  res.json({ message: "Task deleted" });
});


module.exports = router;
