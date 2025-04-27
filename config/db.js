const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 50,
      retryWrites: true,
    })
    console.log('MongoDB Connected')
  } catch (err) {
    console.error('Database failed to connect.')
    process.exit(1)
  }
}

module.exports = connectDB
