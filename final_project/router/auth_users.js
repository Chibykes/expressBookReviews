const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  const userFound = users.find((user) => user.username === username);

  return !userFound;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  return !!user;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    let token = jwt.sign({ username, password }, "secret", {
      expiresIn: 60 * 60,
    });
    req.session.authorization = token;

    res.header("Authorization", `Bearer ${token}`);

    return res.status(200).json({ message: "User logged in successfully" });
  }

  return res.status(200).json({ message: "Invalid Credentials" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { review } = req.query;

  if (!req.user) {
    return res
      .status(200)
      .json({ message: "You need to be signed in to drop a review" });
  }

  const bookByISBN = books[req.params.isbn];
  bookByISBN.reviews = {
    ...bookByISBN.reviews,
    [req.user.username]: review,
  };

  return res.status(200).json({ message: "Review has been added" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here

  if (!req.user) {
    return res
      .status(200)
      .json({ message: "You need to be signed in to delete a review" });
  }

  const bookByISBN = books[req.params.isbn];
  delete bookByISBN.reviews[req.user.username];

  return res.status(200).json({ message: "Review has been deleted" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
