import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { validationResult, matchedData } from "express-validator"
import User from "../models/User.js";
import State from '../models/State.js';
export default {
    signIn: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);

        const user = await User.findOne({email: data.email});

        if(!user){
            res.status(400).json({error: 'Email e/ou senha errados!'});
            return;
        }

        const match = await bcrypt.compare(data.password, user.passwordHash)
        if(!match){
            res.status(400).json({error: 'Email e/ou senha errados!'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.status(200).json({token, email: user.email})
    },

    signUp: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);

        const user = await User.findOne({
            email:data.email
        })
        if(user){
            res.status(400).json({error:{email:{msg: 'E-mail já em uso'}}})
            return;
        }
        
        if(mongoose.Types.ObjectId.isValid(data.state)){
            
            const stateItem = await State.findById(data.state)
            
            if(!stateItem){
                res.status(400).json({error:{msg: 'Estado não existe'}})
                return;
            }
        } else {
            res.status(400).json({error:{msg: 'Código de Estado Inválido'}})
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        })
        await newUser.save();

        res.status(200).json(token)
    },
}