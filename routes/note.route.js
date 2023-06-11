const express = require('express');
const {NoteModel} = require("../models/note.model")
const {auth} = require("../middlewares/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/create",async(req,res)=>{
    try {
        const note = new NoteModel(req.body);
        await note.save()
        res.json({msg:"new note is created",data:req.body})
    } catch (err) {
        res.json({error:err.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.json({notes})
    } catch (err) {
        res.json({error:err.message})
    }
})

noteRouter.patch("/update/:noteId",async(req,res)=>{

    const noteId = req.params.noteId;
    const userIDofUserDoc = req.body.userID; 
    try {
        const note = await NoteModel.findOne({_id: noteId});
        const userIDofNoteDoc = note.userID;
        if(userIDofUserDoc === userIDofNoteDoc){
            await NoteModel.findByIdAndUpdate({_id: noteId},req.body);
            res.json({msg:"updated successfully",note:req.body})
        }
    } catch (error) {
        res.json({error:error})
    }
    
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId = req.params.noteId;
    const userIDofUserDoc = req.body.userID; 
    try {
        const note = await NoteModel.findOne({_id: noteId});
        const userIDofNoteDoc = note.userID;
        if(userIDofUserDoc === userIDofNoteDoc){
            await NoteModel.findByIdAndDelete({_id: noteId},req.body);
            res.json({msg:"deleted successfully",note:req.body})
        }
    } catch (error) {
        res.json({error:error})
    }
})

module.exports={
    noteRouter
}