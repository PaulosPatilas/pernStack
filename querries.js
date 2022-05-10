const { createTokens } = require("./JWT");
const bcrypt = require("bcrypt");
require('dotenv').config();
//Connecting to a Postgres database from Node.js 
//In a production environment, you would want to put your configuration details 
//in a separate file with restrictive permissions that is not accessible from version control


//Development enviroment configuration 
const devConfig = {
  user: process.env.PG_USER,
  password:process.env.PG_PASSWORD,
  host:process.env.PG_HOST,
  port:process.env.PG_PORT,
  database:process.env.PG_DATABASE
}

//Production enviroment configuration
const prodConfig = {
  connectionString: process.env.DATABASE_URL ,
  ssl: {
    rejectUnauthorized: false
  } 
  // This is coming from Heroku addon for postgresql
}

const Pool = require('pg').Pool
const pool = new Pool(process.env.NODE_ENV === 'production'? prodConfig : devConfig)

//GET all employees
const getEmployees = async(request, response) => {
    console.log('starting async query')
    await pool.query('SELECT * FROM Employee ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    console.log('async query finished')
}

const getEmployeeById = async(request, response) => {
  const id = parseInt(request.params.id)
  await pool.query(
    'SELECT * FROM Employee WHERE id = $1' ,[id], (error,results) => {
      if(error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log('Employee with id'+ id);
    })
}

//POST a new employee
 const  createEmployee = async(request, response) => {
    //We create the body of the request(what we will Post)
    const { last_name, first_name, is_active, date_of_birth } = request.body
  
    await pool.query('INSERT INTO Employee (last_name, first_name, is_active, date_of_birth) VALUES ($1, $2, $3, $4)', [last_name, first_name, is_active, date_of_birth], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${response.insertId}`)
    })
}

//UPDATE an existing Employee
const updateEmployee = async(request, response) => {
    const id = parseInt(request.params.id)
    console.log(id);
    const {last_name, first_name, is_active, date_of_birth } = request.body;
    console.log(request);
    await pool.query(
      'UPDATE Employee SET last_name = $1, first_name = $2, is_active = $3, date_of_birth = $4 WHERE id = $5',
      [last_name, first_name, is_active, date_of_birth, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}` + request.body)
      }
    )
    console.log('DONE');
}

//DELETE an Employee
const deleteEmployee = async(request, response) => {
    const id = parseInt(request.params.id)
  
    await pool.query('DELETE FROM Employee WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  const createUser = async(request,response) => {
    
    const {username,password} = request.body
    bcrypt.hash(password,10).then(async (hash) => { 
      console.log(hash + "  " +password)
      await pool.query('INSERT INTO Users VALUES($1,$2)',[username,hash],(error,results) =>{
        if (error) {
          throw error
        }
        response.status(200).send('User added. Welcome !!')
      })
    }) 
  }
  
  const loginUser = async(request,response) => {
  
    console.log(process.env.DATABASE_URL)
    const {username, password} = request.body;
  
     await pool.query("SELECT * FROM Users WHERE username = $1;",[username], (error,result) => {
      console.log("Query executing...")
      if(error){
        throw error;
      }
      
      if(result.rows.length > 0){
        const dbPass = result.rows[0].password
        bcrypt.compare(password, dbPass)
        .then( (match) => {
          if(!match){
            response.status(400).json({auth: false, message:'no user exists'})
            console.log("Password doesnt match")
          }
          else {
            console.log("Credential are OK!")
            const user = result.rows[0]
            //const id = result.rows[0].id
            const accessToken = createTokens(user)
            response.cookie('token',accessToken,{
              maxAge: 60*60*24 ,
              httpOnly:true,
              secure:true,
                        
           })
            response.locals.accessToken = accessToken
            response.json({auth: true, token:accessToken, result:result.rows})
            // res.cookie("access-token", accessToken, {
            //   maxAge: 60 * 60 * 24 * 30 * 1000,
            //   httpOnly: true,
            // });
          }
        }
      )}
      //response.status(200).send("User Logged In" + username + password)
    })
  }
  
  const validateAuth = (request,response) => {
    response.send('U are authenyicated')
  }
  
  module.exports = {
    loginUser,
    createUser,
    validateAuth,
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
  }