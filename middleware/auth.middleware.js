const jwt = require("jsonwebtoken");
const Role = require('../model/role.schema.js');
require('dotenv').config();

const auth = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        try {
            req.payload = jwt.verify(token, process.env.JWT_KEY);
            const roleToCheck = Role.getByName(role);
            if(role && req.payload.roles && !req.payload.roles.includes(roleToCheck.id)){
                return res.status(403).json({message: "Vous n'avez pas les droits pour réaliser cette action"});
            }
            next();
        } catch (e) {
            return res.status(401).json({ message: "Vous devez être authentifié pour réaliser cette action" });
        }
    }
}

module.exports = auth;
