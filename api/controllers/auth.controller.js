import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from "../utils/validation.js";

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    const validUser = await User.findOne({username});
    if (validUser) return next(errorHandler(409, 'Username already Exists!'));

    if (!validateEmail(email)) return next(errorHandler(400, 'Invalid Email Format'));

    const validEmail = await User.findOne({email});
    if (validEmail) return next(errorHandler(409, 'Email already Exists!'));
    
    const passwordError = validatePassword(password);
    if (passwordError) return next(errorHandler(400, passwordError));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User Created Successfully!');
    }catch(error){
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(401, 'Invalid Username or Password'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid Username or Password!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch(error)
    {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been Logged Out Successfully!');
    } catch (error) {
        next(error);
    }
};