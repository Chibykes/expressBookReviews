const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (isValid(username)) {
    users.push({
      username,
      password,
    });

    return res.status(200).json({ message: "User registered successfully" });
  }

  return res.status(200).json({ message: "Username already exists" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json({ books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const bookByISBN = books[req.params.isbn];
  if (bookByISBN) {
    return res.status(200).json(bookByISBN);
  }
  return res
    .status(200)
    .json({ message: "ISBN does not match any book in records" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const booksByAuthor = Object.entries(books).filter(
    ([isbn, book]) =>
      book.author
        .toLowerCase()
        .search(req.params.author.toLowerCase().trim()) !== -1
  );
  return res.status(200).json({ booksByAuthor });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const booksByTitle = Object.entries(books).filter(
    ([isbn, book]) =>
      book.title.toLowerCase().search(req.params.title.toLowerCase().trim()) !==
      -1
  );
  return res.status(200).json({ booksByTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const bookByISBN = books[req.params.isbn];

  if (bookByISBN) {
    return res.status(200).json(bookByISBN.reviews);
  }
  return res
    .status(200)
    .json({ message: "ISBN does not match any book in records" });
});

module.exports.general = public_users;
