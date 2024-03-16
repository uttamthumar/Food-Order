const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./router/producrtRouter');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = process.env.PORT || 7001;
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/Crud-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
