const express = require('express');
const userRouter = express.Router();
const {UserModel} = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).json({error:err.message})
            }
            else{
                const user = new UserModel({name,email,password:hash});
                await user.save();
                res.status(200).json({msg:"user has been registered",data:req.body})
            }
        })
    } catch (err) {
        res.json({error:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,user:user.name},process.env.secret)
                    res.status(200).json({msg:"logged in successfully",token})
                }else{
                    res.res(200).json({error:"wrong password"})
                }
            })
        }
        else{
            res.status(200).json({msg: "User not found"})
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

module.exports ={
    userRouter
}