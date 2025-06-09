const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const authenticateToken = require('../middleware/authMiddleware')

const router = express.Router()

const usersFilePath = path.join(__dirname, '../data/users.json')
const rolesFilePath = path.join(__dirname, '../data/role.json')

// Helper function to read users from JSON file
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath)
  return JSON.parse(data)
}

// Helper function to write users to JSON file
const writeUsers = users => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

// Helper function to read roles from JSON file
const readRoles = () => {
  const data = fs.readFileSync(rolesFilePath)
  return JSON.parse(data)
}

// Secret key for JWT (in a real app, store this in environment variables)
const JWT_SECRET = 'supersecretkey'

router.get('/', authenticateToken, (req, res) => {
  const action = req.query.action
  if (!["read", "create", "update", "delete"].includes(action)) {
    return res.status(400).json({ message: `Action "${action}" is invalid.` }); // ✅ return اضافه شد
  }

  const users = readUsers()
  const user = users.find(user => user.id === req.user.id)
  if (!user) {
    return res.status(422).json({ message: 'User not found or unauthorized' })
  }

  const roles = readRoles()
  const userRole = roles.find(role => role.id === user.roleId)

  if (!userRole || !userRole.products[action]) {
    return res
      .status(422)
      .json({ message: `You are not authorized to ${action} products` })
  }

  res.status(200).json({ action: userRole.products[action] })
})

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Check if the user already exists
  const users = readUsers()
  const existingUser = users.find(user => user.username === username)
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Get the user role from roles.json
  const roles = readRoles()
  const userRole = roles.find(role => role.name === 'user')
  if (!userRole) {
    return res.status(500).json({ message: 'Default role not found' })
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create a new user with the user role and add to the users array
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    roleId: userRole.id
  }
  users.push(newUser)
  writeUsers(users)

  res.status(201).json({ message: 'User registered successfully' })
})

// Login and generate JWT token
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const users = readUsers()
  const user = users.find(user => user.username === username)
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  // Check the password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h'
  })

  res.json({ token, username: user.username })
})

module.exports = router
