const API_URL = "http://localhost:3000/api/todos";

document.getElementById("todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("todo-title").value;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  const todo = await response.json();
  addTodoToList(todo);
});

async function loadTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  todos.forEach(addTodoToList);
}

function addTodoToList(todo) {
  const list = document.getElementById("todo-list");
  const item = document.createElement("li");
  item.className = "todo" + (todo.completed ? " completed" : "");
  item.textContent = todo.title;
  item.dataset.id = todo.id;
  item.addEventListener("click", toggleTodo);
  list.appendChild(item);
}

async function toggleTodo(e) {
  const id = e.target.dataset.id;
  const response = await fetch(`${API_URL}/${id}`);
  const todo = await response.json();
  todo.completed = !todo.completed;
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  e.target.classList.toggle("completed");
}

loadTodos();
