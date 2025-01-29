const mongoose = require('mongoose')
const env = require('dotenv')

env.config()

const mongoURI = process.env.mongoURI

const initializeDatabase = async() => {
  try {
    const isConnected = await mongoose.connect(mongoURI)
    if (isConnected)
    {
      console.log("Connected Successfully")
    }
  }
  catch(error) {
    console.log('Failed to Connect: ',error)
  }
}

module.exports = initializeDatabase