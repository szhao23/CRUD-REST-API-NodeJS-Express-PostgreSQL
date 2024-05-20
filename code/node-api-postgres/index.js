// Initial Setup to install Express for the Server and connect to PostgreSQL
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to look for a GET request on the root / URL and return JSON
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Set the App to Listen on the Port we set
app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});

// From Command Line, start server by hitting index.js
// node index.js
// App running on port ...
// While server is running, if we navigate to localhost:3000 in URL Browser, should see the JSON that we just set above
// Express Server is running, however is only sending static JSON data that we created
// Next step is to connect to PostgreSQL from Node.JS to be able to make dynamic queries

// Connecting to Postgres Database from Node.JS
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "shz",
  host: "localhost",
  database: "api",
  password: process.env.POSTGRES_PW,
  port: 5432,
});
