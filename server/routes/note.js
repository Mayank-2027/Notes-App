import express from "express";
import Note from "../models/Note.js"
import middleware from "../middleware/middleware.js"

const router =express.Router();

router.post("/add",middleware,async(req,res)=>{
    try{
        const {title,description}=req.body;
        
        const newNote= new Note({
            title,description,
            userId :req.user.id

        })
           await newNote.save()

         res.status(200).json({success :true,message : "Note Create Succesfully"})
    } catch(error){
        res.status(500).json({success :false,message : "Error in adding Note"});
        console.log("REGISTER ERROR:", error);
    }
})

router.get('/',middleware,async(req,res)=>{
    try{
        const notes = await Note.find({ userId: req.user.id })
        return res.status(200).json({success:true,notes})
    } catch(error){
        return res.status(500).json({success:false ,message :"can't retrive notes"})
    }
})

router.put("/:id",middleware,async(req,res)=>{
    try {
        const {id}=req.params;
        const updateNote = await Note.findOneAndUpdate(
          { _id: id, userId: req.user.id },
          req.body,
          { new: true }
        )
        if(!updateNote){
          return res.status(404).json({success:false ,message :"Note not found"})
        }
        return res.status(200).json({success:true ,updateNote,message :"Notes Updates"})
    } catch(error){
        return res.status(500).json({success:false ,message :"can't update notes"})
    }
})

router.delete("/:id",middleware,async(req,res)=>{
    try {
        const {id}=req.params;
        const updateNote = await Note.findOneAndDelete({ _id: id, userId: req.user.id })
        if(!updateNote){
          return res.status(404).json({success:false ,message :"Note not found"})
        }
        return res.status(200).json({success:true ,updateNote,message :"Notes Updates"})
    } catch(error){
        return res.status(500).json({success:false ,message :"can't update notes"})
    }
})
export default router
