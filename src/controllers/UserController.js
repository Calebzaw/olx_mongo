import { validationResult, matchedData } from "express-validator"
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import State from '../models/State.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Ad from '../models/Ad.js';

export default {
    getStates: async (req, res) => {
        let states = await State.find();
        res.json({states})
    },

    getInfo: async (req,res) => {
        let token = req.query.token;

        const user = await User.findOne({token})
        const state = await State.findById(user.state)
        const ads = await Ad.find({idUser: user._id.toString()})

        let adList = []
        for(let i in ads) {

            const cat = await Category.findById(ads[i].category)

            adList.push({
                ...ads[i]._doc, category: cat.slug
            })
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        })
    },

    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({error: errors.mapped()})
            return
        }
        const data = matchedData(req);

        let updates = {}

        if(data.name){
            updates.name = data.name;
        }

        if(data.email){
            const emailCheck = await User.findOne({email: data.email})
            if(emailCheck){
                res.status(400).send("Email Já existe")
                return;
            }
            updates.email = data.email;
        }

        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){
                const stateCheck = await State.findById(data.state)
                if(!stateCheck){
                    res.status(400).json({error: "Estado não existe"})
                    return;
                }
                updates.state = data.state
            }
        }

        if(data.password){
            updates.passwordHash = bcrypt.hash(data.password, 10)
        }

        await User.findOneAndUpdate({token:data.token},{$set:updates})

        res.status(400).send('Atualizado com sucesso!');
    },
}