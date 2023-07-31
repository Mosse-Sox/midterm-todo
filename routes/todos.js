/* eslint-disable camelcase */
const express = require("express");
const todosRouter = express.Router();
const todosQueries = require("../db/queries/todos-queries");
const categorize = require("./categories");

todosRouter.get("/", (req, res) => {
  todosQueries
    .getTodos()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

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
    .catch((err) => {
      console.error(err.message);
    });
});

todosRouter.post("/:id", (req, res) => {
  const todoId = req.params.id;
  const checkStatus = req.body.checked;

  const updateTodo = {
    completed_at: new Date()
  };

  if (!checkStatus) {
    updateTodo.completed_at = null;
  }
  
  console.log(checkStatus);
  
  todosQueries
    .updateTodo(todoId, updateTodo)
    .then((todo) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.error(err.message);
    });
});

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

module.exports = todosRouter;
