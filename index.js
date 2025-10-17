const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 3, title: "Atomic Habits", author: "James Clear" }
];

let users = [
  { id: 1, name: "Alice", history: ["Harry Potter"] },
  { id: 2, name: "Bob", history: [] }
];

app.get("/", (req, res) => {
  res.send("Library API is working");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("User added");
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.send("User deleted");
});

app.post("/borrow", (req, res) => {
  const { userId, bookTitle } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) user.history.push(bookTitle);
  res.send("Book borrowed");
});

app.post("/return", (req, res) => {
  const { userId, bookTitle } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) user.history = user.history.filter(b => b !== bookTitle);
  res.send("Book returned");
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  res.json(book);
});

app.get("/users/:id/history", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  res.json(user.history);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
