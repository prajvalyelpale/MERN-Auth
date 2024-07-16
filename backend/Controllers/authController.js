const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userModel');
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        res.status(201).json({ message: "SignUp successful!", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errMsg = "Email or Password is wrong!"
        if (!user) {
            return res.status(403).json({ message: errMsg, success: false });
        }
        const isPasswordSame = await bcrypt.compare(password, user.password);
        if (!isPasswordSame) {
            return res.status(403).json({ message: errMsg, success: false });
        }
        //JWT Token Implimentation
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        res.status(201).json({ message: "LogIn successful!", success: true, jwtToken, email, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!", success: false });
    }
};

module.exports = { login, signup };
