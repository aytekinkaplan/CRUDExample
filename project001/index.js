const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// CORS'u etkinleştir
app.use(cors());

// İstek gövdesini JSON olarak ayrıştır
app.use(bodyParser.json());

// Statik dosya sunucu
app.use(express.static("public"));

// Todo listesi verileri
let todos = [];

// GET - Tüm Todosları Listele
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST - Yeni Todo Ekle
app.post("/api/todos", (req, res) => {
  const todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT - Var Olan Todo'yu Güncelle
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  let todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = updatedTodo.title || todo.title;
    todo.completed = updatedTodo.completed ?? todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE - Todo'yu Sil
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

// Sunucuyu Başlat
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
