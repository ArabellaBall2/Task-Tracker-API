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
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;
  await task.save();
  res.json(task);
});

// Delete a task
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await Task.deleteOne({ _id: req.params.id, user: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task" });
  }
});


module.exports = router;
