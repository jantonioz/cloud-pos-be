const express = require('express')
const expressGraphQL = require('express-graphql')
const mongo = require('mongoose')

const app = express()
mongo.connect('mongodb+srv://mongoAdmin:<J2zUUU9jIfbDrxYn>@mongocluster-1n5ld.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}))

mongo.connection.once('open', () => {
  console.log("mongo connected!")
  app.listen(4000, () => console.log("listening on localhost:4000/"))
})