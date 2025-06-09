const fs = require('fs');
const path = require('path');

const rolesFilePath = path.join(__dirname, '../data/role.json');
const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};


const readRoles = () => {
  const data = fs.readFileSync(rolesFilePath);
  return JSON.parse(data);
};

const isManager = (req, res, next) => {
  try {
    const users = readUsers();
    const user = users.find(user => user.id === req.user.id);

    const roles = readRoles();
    const userRole = roles.find(role => role.id === user.roleId);

    if (!userRole || userRole.name !== 'manager') {
      return res.status(403).json({
        message: 'Access denied. Only managers can perform this action.'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking user role' });
  }
};

module.exports = isManager;
