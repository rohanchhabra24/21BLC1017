const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  const userId = "john_doe_17091999"; // Replace with dynamic user_id logic
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";
  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = null;

  // Separate numbers and alphabets from the input data
  if (Array.isArray(data)) {
    numbers = data.filter((item) => !isNaN(item));
    alphabets = data.filter((item) => isNaN(item));

    const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
    highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
  }

  // Construct the response
  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
