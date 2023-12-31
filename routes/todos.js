/* eslint-disable camelcase */
const express = require("express");
const todosRouter = express.Router();
const todosQueries = require("../db/queries/todos-queries");
const categorize = require("./categories");

// GET /todos/
todosRouter.get("/", (req, res) => {
  todosQueries
    .getTodos()
    .then((todos) => {
      res.json(todos);
    })
});

// POST /todos/
todosRouter.post("/", (req, res) => {
  const todoName = req.body.name;
  // call catagorize function to get category
  categorize(todoName)
    .then((category) => {
      const todo = {
        name: todoName,
        category: category,
      };

      todosQueries.addTodo(todo).then((result) => {
        res.status(201).send();
      });
    })
});

// POST /todos/:id -- updates a todos completed_at
todosRouter.post("/:id", (req, res) => {
  const todoId = req.params.id;
  const checkStatus = req.body.checked;

  todosQueries
    .updateTodo(checkStatus, todoId)
    .then((todo) => {
      res.status(200).send();
    })
});

// POST /todos/:id/delete -- deletes a todo
todosRouter.post("/:id/delete", (req, res) => {
  const todo_id = req.params.id;
  todosQueries
    .deleteTodo(todo_id)
    .then((result) => {
      res.status(201).send();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });

    });
});

// POST /todos/:id/update_category -- updates a todos category
todosRouter.post("/:id/update_category", (req, res) => {
  const todo_id = req.params.id;
  const newCategory = req.body.category;
  todosQueries
    .updateTodoCategory(todo_id, newCategory)
    .then((result) => {
      res.status(201).send();
    })
});

module.exports = todosRouter;
