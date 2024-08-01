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

// Now that we have all of our queries, we need to pull them into index.js and make endpoint routes for all the query functions created.
// To get all the exported functions from queries.js, we'll require the file and assign it to a variable:
const db = require("./queries");

// Now, for each endpoint, we'll se the HTTP request method, the endpoint URL, and the relevant function:
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
