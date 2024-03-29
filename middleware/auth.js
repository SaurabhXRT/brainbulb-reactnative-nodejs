const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SecretKey = "2809a95eedde5863d8e8e3bea5205cd62d290b10a3769afee677b8754a4d05b7"

const authMiddleware = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        console.log(token, "this is the token");
        // const decoded = jwt.verify(token, SecretKey); 

        const decoded = jwt.verify(token, SecretKey, (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err.message);
                throw new Error('Invalid token');
            }
            return decoded;
        });
        console.log(decoded.userId);
        req.userId = decoded.userId;
        const user = await User.findOne({ _id: decoded.userId });
        console.log(user);

        if (!user) {
            console.log("user not found");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'bhaag bsdk' });
    }
};

module.exports = authMiddleware;
