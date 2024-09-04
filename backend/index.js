const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 

// Initialize Express App 
const app = express(); 

// Middleware 
app.use(cors()); 
app.use(bodyParser.json()); 

app.get('/', function (req, res) {
    res.send('Hello World')
  })

// MongoDB Connection 
mongoose.connect('mongodb://localhost:27017/insightvox')
  .then(() => { 
    console.log('Connected to MongoDB'); 
  })
  .catch((err) => { 
    console.error('Failed to connect to MongoDB:', err); 
  }); 

// Routes 
const authRoutes = require('./routes/auth'); 
app.use('/auth', authRoutes); 

// Start the Server 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
}); 
