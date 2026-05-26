const jwt = require('jsonwebtoken');
const user = require('../models/user');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await user.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token!" });
    }
}

module.exports = { protectRoute };