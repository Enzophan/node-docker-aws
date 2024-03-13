const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");


const findAllUsers = asyncHandler(async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
        next()
    }
})

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ where: { email } });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        return res.status(201).json({ id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data us not valid");
    }
    // res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ where: { email } });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
        user.token = accessToken;
        await user.save();
        return res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const getUserById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        };
        const user = await User.findOne({ where: { id } });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400);
            throw new Error("All fields are mandatory!");
        };
        const user = await User.findOne({ where: { id } });
        user.destroy();
        return res.json({ message: "remove success" })
    } catch (error) {
        res.status(400);
        throw new Error("User data us not valid");
    }
})

module.exports = { findAllUsers, registerUser, loginUser, currentUser, getUserById, deleteUser };