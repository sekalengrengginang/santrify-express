const express = require('express')
const app = express()
const port = 3000

// route list
const santriRoute = require('./routes/santri')
const classroomRoute = require('./routes/classroom')
const teacherRoute = require('./routes/teacher')
const userRoute = require('./routes/user')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// route
app.use(santriRoute);
app.use(classroomRoute);
app.use(teacherRoute)
app.use(userRoute);

// default homepage
app.get('/', (req, res) => {
  res.send('index page')
})

// listen at port
app.listen(port, () => {
  console.log(`aplikasi berjalan pada port ${port}`)
})