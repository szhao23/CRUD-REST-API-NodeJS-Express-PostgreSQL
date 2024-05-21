// We’ll create six functions for six routes, as shown below. First, create all the functions for each route. Then, export the functions so they’re accessible:

// GET: / | displayHome()
// GET: /users | getUsers()
// GET: /users/:id | getUserById()
// POST: /users | createUser()
// PUT: /users/:id | updateUser()
// DELETE: /users/:id | deleteUser()

// GET ALL users
const getUsers = (request, response) => {
  pool.query("Select * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET a SINGLE USER by ID
// For our /users/:id request, we'll get the custom id parameter by the URL and use a WHERE clause to display the result
// In SQL query, we're looking for id=$1, $1 is a numbered placeholder that PostgreSQL uses natively instead of the ? placeholder from other SQL variations
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// POST a NEW USER
// This API will take a GET and POST request to the /users endpoint.
// In this POST request, we'll add a new user. The function will extract the name and email properties from the request body and insert the values using INSERT
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [
    name,
    email,
  ]);
  if (error) {
    throw error;
  }
  response.status(201).send(`User added with the ID: ${results.rows[0].id}`);
};

// PUT updated data in an existing user
// The /user/:id endpoint will take two HTTP requests, the GET we created for getUserById and a PUT to modify an existing user.
// We'll combine the GET and POST to use the UPDATE clause
// PUT is idempotent, meaning the exact same call can be made over and over and will produce the same result.
// PUT is different than POST, in which the exact same cell repeated will continously make new users with the same data.
const updateUser = (requst, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with the ID: ${id}`);
    }
  );
};

// DELETE A USER
// Delete Clause on /users/:id to delete a specific user by ID, similar to getUserById() function
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with the ID: ${id}`);
  });
};
