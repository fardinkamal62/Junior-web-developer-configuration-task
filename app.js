const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors());

app.use('/api/users', userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  if (process.env.MONGO_URL == null || process.env.JWT_SECRET == null) {
    console.error('Environment not found');
    process.exit(1);
  }

  try {
    connectDB().then(() => {
      console.log('Server running at PORT -->', PORT)
    })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  } catch (e) {
    console.error("Cannot start server")
    console.error(e);
  }
})