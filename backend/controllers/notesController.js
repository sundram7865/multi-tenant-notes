const Note = require("../models/Note");

exports.getNotes = async (req,res)=>{
  const notes = await Note.find({ tenant: req.user.tenant._id });
  res.json(notes);
}

exports.createNote = async (req,res)=>{
  const { title, content } = req.body;


  if(req.user.tenant.subscription === "FREE"){
    const count = await Note.countDocuments({ tenant: req.user.tenant._id });
    if(count >= 3) return res.status(403).json({message: "Free plan limit reached"});
  }

  const note = await Note.create({
    title, content,
    tenant: req.user.tenant._id,
    user: req.user._id
  });
  res.status(201).json(note);
}

exports.getNote = async (req,res)=>{
  const note = await Note.findOne({ _id: req.params.id, tenant: req.user.tenant._id });
  if(!note) return res.status(404).json({message: "Not found"});
  res.json(note);
}

exports.updateNote = async (req,res)=>{
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, tenant: req.user.tenant._id },
    req.body,
    { new: true }
  );
  if(!note) return res.status(404).json({message: "Not found"});
  res.json(note);
}

exports.deleteNote = async (req,res)=>{
  const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: req.user.tenant._id });
  if(!note) return res.status(404).json({message: "Not found"});
  res.json({message: "Deleted"});
}
