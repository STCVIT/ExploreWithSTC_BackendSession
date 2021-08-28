const express = require("express");
const Todo = require("../models/todo");
const router = new express.Router();

router.post("/createtodo", async (req, res) => {
  try {
    const todo = new Todo({
      todo: req.body.todo,
      ownername: req.body.name,
    });
    await todo.save();
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).send(todos);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/todos/me", async (req, res) => {
  try {
    const name = req.body.name;
    const todos = await Todo.find({ ownername: name });
    if (todos) {
      res.status(200).send(todos);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      completed: req.body.completed,
    });
    await todo.save();
    res.status(200).send(todo);
  } catch (err) {
    console.log(err);
    res.status(200).send(err);
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).send(todo);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
