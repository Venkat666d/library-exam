const express = require("express");
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Spiderman", author: "Yasir sir" },
  { id: 2, title: "Harry Potter", author: "Mubarak sir" },
  { id: 3, title: "cse", author: "AAdil sir" }
];

let users = [
  { id: 1, name: "salman", history: ["Harry Potter"] },
  { id: 2, name: "sharukh", history: [] }
];

app.get("/", (req, res) => {

 res.send("Library API is working - use /users to get users history and /books for books route ");
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
