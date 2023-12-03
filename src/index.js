const express = require('express');
const bodyParser = require('body-parser');

// needed for reading the index.html synchronously
const fs = require('fs');

// dealing with the images
const multer = require('multer');

const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Sample data to store recipes
const recipes = [];

app.get('/recipe/:food', (req, res) => {
  const foodName = req.params.food;
  // ... (same as before)
});

app.post('/recipe/', (req, res) => {
  const { name, instructions, ingredients } = req.body;

  // Creating the recipe JSON object
  const newRecipe = {
    name,
    instructions,
    ingredients
  };

  // Add the new recipe to the recipes array
  recipes.push(newRecipe);

  // Sending the new recipe JSON object back
  res.json(newRecipe);
});

app.post('/images', upload.array('images', 5), (req, res) => {
  // Handle uploaded images (stored in req.files)
  const images = req.files.map(file => ({
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    buffer: file.buffer.toString('base64'), // Convert buffer to base64 string for simplicity
  }));

  // Log the uploaded image
  console.log('Uploaded Images:', images);

  // Sending a simple response back to the client
  res.send('Images received successfully!');
});

app.get('/', (req, res) => {
  // Construct path to "index.html" because it's not on same level as index.js
  const indexPath = path.join(__dirname, '../index.html');

  // Read the content of the "index.html" file synchronously
  const htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Sending the HTML content in the response
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
