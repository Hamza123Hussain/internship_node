// routes/users.js
// Importing the Router feature from Express to define separate route handlers
import { Router } from 'express'
// Creating a new router object. This acts like a mini Express app.
const router = Router()
// ===========================
// FAKE IN-MEMORY "DATABASE"
// ===========================
// This array will hold our user data temporarily. It will be reset whenever the server restarts.
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]
// ===========================
// ROUTES BEGIN HERE
// ===========================
// 📍 GET /users - Fetch all users
router.get('/', (_, res) => {
  // Send back the full array of users
  res.json(users)
})
// 📍 GET /users/GetUserById - Fetch a single user by ID
router.get('/GetUserById', (req, res) => {
  // Convert the ID from string to a number
  const userId = parseInt(req.query.id)
  // Find the user in the array by ID
  const user = users.find((u) => u.id === userId)
  // If user is found, send it as response
  if (user) {
    res.json(user)
  } else {
    // If not found, send a 404 (Not Found) error
    res.status(404).json({ message: 'User not found' })
  }
})
// 📍 POST /users - Create a new user
router.post('/', (req, res) => {
  // Get the name from the request body
  const { name } = req.body
  // Simple validation: check if name is provided
  if (!name) {
    return res.status(400).json({ message: 'Name is required' })
  }
  // Create a new user object with a unique ID
  const newUser = {
    id: users.length + 1, // Not ideal for production, but okay for now
    name: name,
  }
  // Add the new user to the "database" array
  users.push(newUser)
  // Send a response with 201 (Created) and the new user
  res.status(201).json(newUser)
})
// 📍 PUT /users/UpdateById - Update an existing user
router.put('/UpdateById', (req, res) => {
  // Convert ID from string to number
  const userId = parseInt(req.query.id)
  // Get the updated name from the request body
  const { name } = req.body
  // Find the user with matching ID
  const user = users.find((u) => u.id === userId)
  // If user exists, update the name
  if (user) {
    user.name = name
    res.json(user) // Send back the updated user
  } else {
    // If not found, send a 404 error
    res.status(404).json({ message: 'User not found' })
  }
})
// 📍 DELETE /users/DeleteById- Delete a user by ID
router.delete('/DeleteById', (req, res) => {
  // Convert ID to number
  const userId = parseInt(req.query.id)
  // Filter out the user with the given ID
  const newUsersArray = users.filter((u) => u.id !== userId)
  // Check if the user was actually removed
  if (newUsersArray.length === users.length) {
    return res.status(404).json({ message: 'User not found' })
  }
  // Update the users array to reflect the deletion
  users = newUsersArray
  // Send success message
  res.json({ message: 'User deleted successfully' })
})
// ===========================
// EXPORTING THE ROUTER
// ===========================
// This allows us to import these routes in our main index.js file
export default router
