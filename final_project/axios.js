const axios = require("axios");

// Task 10: Get all books – Using async callback function – 2 Points
(async () => {
  try {
    const response = await axios.get("http://localhost:5000/");
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();



// Task 11: Search by ISBN – Using Promises – 2 Points
axios
  .get("http://localhost:5000/isbn/1")
  .then((response) => {
    const data = response.data;
    console.log(data);
  })
  .catch((error) => console.error(error));



// Task 12: Search by Author – 2 Points
axios
  .get("http://localhost:5000/author/Chinua")
  .then((response) => {
    const data = response.data;
    console.log(data);
  })
  .catch((error) => console.error(error));



// Task 13: Search by Title - 2 Points
axios
  .get("http://localhost:5000/title/Things Fall")
  .then((response) => {
    const data = response.data;
    console.log(data);
  })
  .catch((error) => console.error(error));




// Task 14: Submission of Project GitHub Link - 2 Points

// https://github.com/Chibykes/expressBookReviews.git