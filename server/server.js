import config from './config/config'
import app from './express'
import mongoose from 'mongoose'

//Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)

console.info('mongodb start on port %s.', config.mongoUri)

mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('Server started on port %s.', config.port)
})