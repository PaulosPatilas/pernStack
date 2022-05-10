
//Setting up an Express.js server
const express = require('express')
const cookieParser = require("cookie-parser");
const { validateToken } = require("./JWT");
const cors = require('cors')
const db = require('./querries')
const bodyParser = require('body-parser')
const app = express()
var port = process.env.PORT || 8080
const path = require('path')


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.json());
//app.use(cors(corsOptions))

if(process.env.NODE_ENV === 'production'){
  //server static content 
  app.use(express.static(path.join(__dirname,'ReactProject/my-app/build')))
}
//Root Endpoint
app.get('/api', (request, response) => {

    response.json({ info: 'Node.js, Express, and Postgresql API' })
    //response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


//CRUD ROUTES
app.get('/api/employees', validateToken,db.getEmployees)
app.get('/api/employee/:id', validateToken,db.getEmployeeById)
app.post('/api/employee', validateToken,db.createEmployee)
app.put('/api/employee/:id', validateToken,db.updateEmployee)
app.delete('/api/employee/:id', validateToken,db.deleteEmployee)

//JWT Login
app.post('/api/userRegistry', db.createUser)
app.post('/api/login', db.loginUser)
app.get('/api/isUserAuth',validateToken,db.validateAuth)

//Wildcard redirects 
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'ReactProject/my-app/build/index.html'),function(err) {
    if (err) {
      res.status(500).send(__dirname)
    }
  })
})