const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    });
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new user({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            message: "User registered successfully!",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user!", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({ message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        generateToken(foundUser._id, res);

        res.status(200).json({
            message: "Login successful!",
            user: { _id: foundUser._id, name: foundUser.name, email: foundUser.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Error occurred while logging in!", error });
    }
}

const getMe = async (req,res) =>{
    try {
        res.status(200).json({user:req.user});
    } catch (error) {
        res.status(500).json({message: "Error fetching user data!", error});
    }
}

module.exports = { register, login, getMe };