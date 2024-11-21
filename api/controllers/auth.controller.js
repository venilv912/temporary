import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
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
        if (!validUser) return next(errorHandler(404, 'User Not Found!'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch(error)
    {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if (user) {
            if (req.body.type === 1) return next(errorHandler(409, 'Account Already Exists!'));
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }
        else {
            if (req.body.type === 2) return next(errorHandler(404, 'Account Not Found!'));
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo});
            try{
                await newUser.save();
                const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
                const {password: pass, ...rest} = await newUser._doc;
                res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
            }catch(error){
                next(error);
            }
        }
    } catch(error) {
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