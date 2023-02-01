import mongoose from 'mongoose'

const url =
  'mongodb+srv://francodavolio:rolling-ya@rolling-ya.plgi0a6.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('BD conectada')
})
