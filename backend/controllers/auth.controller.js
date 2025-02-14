import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
           return res.status(400).json({error: "Invalid email Format"}) 
        }

        const existingEmail = await User.findOne({email}) //or use email: email , or use username also
        const existingUsername = await User.findOne({name}) 

        if (existingEmail || existingUsername) {
            return res.status(400).json({error: "Already Existing User or email"})
        }

        if (password.length < 6) {
            return res.status(400).json({error: "Password must have at least 6 characters"})
        }

        //hashing the password
        //123456 = 8d969eef6ecad3c
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                name: newUser.name,
            })
        }
        else{
            res.status(400).json({error: "Invalid User Data"})
        }
    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        generateToken(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.error("Error in login controller ",error);
        res.status(500).json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }
        res.status(200).json({
            success: true, 
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Error in checkAuth", error);
        response.status(500).json({success: false, message: error.message});
    }
}