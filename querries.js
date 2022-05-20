const { createTokens } = require("./JWT");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");
//Connecting to a Postgres database from Node.js
//In a production environment, you would want to put your configuration details
//in a separate file with restrictive permissions that is not accessible from version control

//Development enviroment configuration
const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

//Production enviroment configuration
const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // This is coming from Heroku addon for postgresql
};

if (process.env.NODE_ENV === "production") {
  var url = "https://pern-crud-dep.herokuapp.com";
} else {
  var url = "http://localhost:3000";
}

//SET EMAIL VERIFICATION
const secret = "bezkoder-secret-key";
const user = "confirmationtest273@gmail.com";
const pass = "test_test273";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

//CREATE POOL FOR CLIENT REQUESTS
const Pool = require("pg").Pool;
const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

//HREF MUST CHANGE PARAMETRICALLY FOR DEV AND PROD ENVs
const sendConfirmationEmail = (name, email, confirmationCode, url) => {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${url}/confirmation/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const sendRestorationEmail = (url, confirmationCode, email) => {
  console.log("Check2");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Reset your password",
      html: `<h1>Lets create a new password for you</h1>
        <p>You will be redirected in a new page where you will reset your password to a new one. Press the link below.</p>
        <a href=${url}/restoration/${confirmationCode}> Click here</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

const resentCofirmationEmail = (request, response) => {
  const username = request.body.username;
  pool.query(
    "SELECT confirmationCode FROM Users WHERE username = $1",
    [username],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result.rows[0]);
      const confirmationCode = result.rows[0].confirmationcode;

      if (process.env.NODE_ENV === "production") {
        var url = "https://pern-crud-dep.herokuapp.com";
      } else {
        var url = "http://localhost:3000";
      }
      sendConfirmationEmail(
        username,
        request.body.email,
        confirmationCode,
        url
      );
    }
  );
};

//THELW NA ALLAKSW TO PARSING
const resetPassword = async (request, response) => {
  const code = request.params.confirmationcode;
  const password = request.body[0]; // alakse to type tou body kai einai array pleon ?!?!?!?
  console.log(code);
  console.log(request.body[0]);
  console.log(password);
  bcrypt.hash(password, 10).then(async (hash) => {
    await pool.query(
      "UPDATE Users SET password = $1 WHERE confirmationcode = $2",
      [hash, code],
      (error, result) => {
        if (error) {
          throw error;
        }
        response.status(200).json("Password Changed!");
      }
    );
  });
};

const restorePassword = (request, response) => {
  console.log("Restore Password");
  const email = request.body.email;
  console.log(request.body[0] + "   " + email);
  pool.query(
    `SELECT confirmationcode FROM users WHERE email = '${email}'`,
    (error, result) => {
      console.log("query is working...");
      if (error) {
        throw error;
      }
      console.log(result);
      if (result.rows.length > 0) {
        console.log("query DONE");
        if (process.env.NODE_ENV === "production") {
          console.log("we are in prod");
          var url = "https://pern-crud-dep.herokuapp.com";
        } else {
          console.log("dev time");
          var url = "http://localhost:3000";
        }
        sendRestorationEmail(url, result.rows[0].confirmationcode, email);
        response.status(200).json({ message: "Email has been sent!" });
      } else {
        response.status(400).json({ message: "Something went wrong!" });
      }
      console.log();
    }
  );
};

//GET all employees
const getEmployees = async (request, response) => {
  console.log("starting async query");
  console.log(request.userID.id);
  const user_id = request.userID.id;
  await pool.query(
    "SELECT * FROM Employee WHERE user_id = $1 ORDER BY id ASC",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
  console.log("async query finished");
};

const getEmployeeById = async (request, response) => {
  const id = parseInt(request.params.id);
  const user_id = request.userID.id;
  await pool.query(
    "SELECT * FROM Employee WHERE id = $1 AND user_id = $2",
    [id, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
      console.log("Employee with id" + id);
    }
  );
};

//POST a new employee
const createEmployee = async (request, response) => {
  const { last_name, first_name, is_active, date_of_birth } = request.body;
  console.log(last_name.length);
  if (last_name.length > 50) {
    response
      .status(400)
      .json({ status: false, message: "Last name is too big" });
  } else if (first_name.length > 50) {
    response
      .status(400)
      .json({ status: false, message: "First name is too big" });
  } else {
    const user_id = request.userID.id;
    await pool.query(
      "INSERT INTO Employee (last_name, first_name, is_active, date_of_birth, user_id) VALUES ($1, $2, $3, $4, $5)",
      [
        last_name,
        first_name,
        is_active,
        moment.utc(date_of_birth).format("MM-DD-YYYY"),
        user_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).json({ status: true, message: "User added" });
      }
    );
  }
};

//UPDATE an existing Employee params.id = undefioned
const updateEmployee = async (request, response) => {
  const { last_name, first_name, is_active, date_of_birth } = request.body;

  if (last_name.length > 50) {
    response
      .status(400)
      .json({ status: false, message: "Last name is too big" });
  } else if (first_name.length > 50) {
    response
      .status(400)
      .json({ status: false, message: "First name is too big" });
  } else {
    const user_id = request.userID.id;
    const id = parseInt(request.params.id);
    console.log(request.params);
    console.log(id + "  " + user_id);
    await pool.query(
      "UPDATE Employee SET last_name = $1, first_name = $2, is_active = $3, date_of_birth = $4 WHERE id = $5 AND user_id = $6",
      [
        last_name,
        first_name,
        is_active,
        moment(date_of_birth).format("MM-DD-YYYY"),
        id,
        user_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json({ status: true, message: "User modified" });
      }
    );
  }
};
//DELETE an Employee
const deleteEmployee = async (request, response) => {
  const id = parseInt(request.params.id);
  const user_id = request.userID.id;
  await pool.query(
    "DELETE FROM Employee WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};
//
const createUser = async (request, response) => {
  //confirmation email token
  const token = sign({ email: request.body.email }, "jwtsecretplschange");
  //requests body values
  const { username, password, email } = request.body;

  if (username.length > 50) {
    response
      .status(400)
      .json({ status: false, message: "Username must have 50 chars maximum" });
  } else {
    bcrypt.hash(password, 10).then(async (hash) => {
      //console.log(hash + "  " +password)
      await pool.query(
        "SELECT * FROM Users WHERE username = $1;",
        [username],
        (error, result) => {
          if (error) {
            throw error;
          }
          if (result.rows.length > 0) {
            response.status(400).json({
              status: false,
              message: "Username already exists. Try something else.",
            });
          } else {
            pool.query(
              "INSERT INTO Users (username,password,email,confirmationcode) VALUES($1,$2,$3,$4);",
              [username, hash, email, token],
              (error, results) => {
                if (error) {
                  throw error;
                }
                response.status(200).send({
                  status: true,
                  message: `Welcome ${username}. You need to confirm your email address first. Check your email! If email didnt reach you, give it another try!`,
                });
              }
            );
          }
        }
      );
    });
  }
  sendConfirmationEmail(username, email, token, url);
};

const verifyUser = async (request, response) => {
  console.log("wait...");
  confirmationCode = request.params.confirmationCode;
  await pool.query(
    "SELECT * FROM Users WHERE confirmationCode = $1",
    [confirmationCode],
    (error, result) => {
      if (error) {
        throw error;
      }
      if (result.rows.length > 0) {
        pool.query(
          "UPDATE Users SET status = 'active' WHERE confirmationCode = $1;",
          [confirmationCode],
          (error) => {
            if (error) {
              throw error;
            }
          }
        );
      }
    }
  );
};

const loginUser = async (request, response) => {
  const { username, password } = request.body;
  // AND status = 'active'
  await pool.query(
    "SELECT * FROM Users WHERE username = $1 ;",
    [username],
    (error, result) => {
      console.log("Query executing...");
      if (error) {
        throw error;
      }
      if (result.rows[0]?.status == "pending") {
        response.status(400).json({
          auth: false,
          message: "You need to confirm your email address first.",
        });
      } else if (result.rows.length > 0 && result.rows[0].status == "active") {
        const dbPass = result.rows[0].password;
        bcrypt.compare(password, dbPass).then((match) => {
          if (!match) {
            response.status(400).json({
              auth: false,
              message: "Password is incorrect! Please try again",
            });
          } else {
            console.log("Credential are OK!");
            const user = result.rows[0];
            //const id = result.rows[0].id
            const accessToken = createTokens(user);
            // response.cookie("token", accessToken, {
            //   maxAge: 60 * 60 * 24,
            //   httpOnly: true,
            //   secure: true,
            // });
            response.locals.accessToken = accessToken;
            response.json({
              auth: true,
              token: accessToken,
              result: result.rows,
            });
            // res.cookie("access-token", accessToken, {
            //   maxAge: 60 * 60 * 24 * 30 * 1000,
            //   httpOnly: true,
            // });
          }
        });
      } else {
        response.status(400).json({
          auth: false,
          message: "No user with such username exists!Maybe create one first",
        });
      }
      //response.status(200).send("User Logged In" + username + password)
    }
  );
};

const validateAuth = (request, response) => {
  response.send("U are authenyicated");
};

module.exports = {
  loginUser,
  createUser,
  verifyUser,
  validateAuth,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  resentCofirmationEmail,
  restorePassword,
  resetPassword,
};
