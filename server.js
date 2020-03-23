require('dotenv').config()
const express = require('express')
const expressGraphQL = require('express-graphql')
const mongo = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const headers = 'key'

const app = express()


//--------------------Use coors--------------------
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    `Origin, X-Requested-With, Content-Type, Accept, Authorization, ${headers}`
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// BodyParser config
app.use(
  bodyParser.json({
    limit: '50mb',
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
)


mongo.Promise = global.Promise;
const user = process.env.MONGO_USER
const pwd = process.env.MONGO_PASSWORD
const dbName = process.env.MONGO_DATABASE_NAME

const uri = `mongodb+srv://${user}:${pwd}@mongocluster-1n5ld.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((err, res) => {
  const port = process.env.NODE_ENV === 'production' ? process.env.HTTP_PORT : 4000
  app.listen(port, () => console.log(`listening on port ${port}`))
})

app.use('/api/', require('./routers'))