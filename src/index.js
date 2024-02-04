const express = require('express')
const app = express()
const port = 3000
const santriRoute = require('./routes/santri')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(santriRoute);
app.get('/', (req, res) => {
  res.send('index page')
})

app.listen(port, () => {
  console.log(`aplikasi berjalan pada port ${port}`)
})