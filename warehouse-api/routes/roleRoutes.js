// routes/roles.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const authenticateToken = require('../middleware/authMiddleware')
const isManager = require('../middleware/managerMiddleware')

const router = express.Router()

const rolesFilePath = path.join(__dirname, '../data/role.json')

const readRoles = () => {
  const data = fs.readFileSync(rolesFilePath)
  return JSON.parse(data)
}

const writeRoles = roles => {
  fs.writeFileSync(rolesFilePath, JSON.stringify(roles, null, 2))
}

router.get('/', authenticateToken, isManager, (req, res) => {
  try {
    const roles = readRoles()
    res.json(roles)
  } catch (error) {
    res.status(500).json({ message: 'Error reading roles' })
  }
})

router.post('/', authenticateToken, isManager, (req, res) => {
  try {
    const { name, products } = req.body
    const roles = readRoles()

    if (roles.some(role => role.name === name)) {
      return res.status(400).json({ message: 'Role with this name already exists' })
    }

    const newRole = {
      id: uuidv4(),
      name,
      products
    }

    roles.push(newRole)
    writeRoles(roles)
    res.status(201).json(newRole)
  } catch (error) {
    res.status(500).json({ message: 'Error creating role' })
  }
})

router.put('/:id', authenticateToken, isManager, (req, res) => {
  try {
    const { id } = req.params
    const { name, products } = req.body
    const roles = readRoles()

    const roleIndex = roles.findIndex(role => role.id === id)
    if (roleIndex === -1) {
      return res.status(404).json({ message: 'Role not found' })
    }

    if (
      name !== roles[roleIndex].name &&
      roles.some(role => role.name === name)
    ) {
      return res.status(400).json({ message: 'Role with this name already exists' })
    }

    roles[roleIndex] = {
      ...roles[roleIndex],
      name,
      products
    }

    writeRoles(roles)
    res.json(roles[roleIndex])
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' })
  }
})

router.delete('/:id', authenticateToken, isManager, (req, res) => {
  try {
    const { id } = req.params
    const roles = readRoles()

    const roleIndex = roles.findIndex(role => role.id === id)
    if (roleIndex === -1) {
      return res.status(404).json({ message: 'Role not found' })
    }

    if (roles[roleIndex].name === 'manager') {
      return res.status(400).json({ message: 'Cannot delete manager role' })
    }

    roles.splice(roleIndex, 1)
    writeRoles(roles)
    res.json({ message: 'Role deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role' })
  }
})

module.exports = router
