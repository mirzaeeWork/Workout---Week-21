const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const rolesFilePath = path.join(__dirname, '../data/role.json');

const readRoles = () => {
  const data = fs.readFileSync(rolesFilePath);
  return JSON.parse(data);
};


const readUsers = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  };

const authorize = action => (req, res, next) => {
    const users = readUsers();
    const user = users.find(user => user.id === req.user.id);
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }


    const roles = readRoles();
    const userRole = roles.find(role => role.id === user.roleId);

    if (!userRole || !userRole.products[action]) {
    return res
      .status(403)
      .json({ message: `You are not authorized to ${action} products` })
  }
  next()



}

module.exports = authorize