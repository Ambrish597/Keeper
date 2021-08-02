//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors= require("cors");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cors());


mongoose.connect("mongodb://localhost:27017/notesDB", {useNewUrlParser: true , useUnifiedTopology: true });

const noteSchema = {
  title: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema);

app.route("/notes")

.get(function(req, res){
  Note.find(function(err, foundNotes){
    if (!err) {
      res.send(foundNotes);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){

  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  console.log(req.body);

  newNote.save(function(err){
    if (!err){
       res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

app.route("/notes/:noteTitle/:noteContent")
.delete(function(req, res){

  Note.deleteOne(
    {title: req.params.noteTitle , content: req.params.noteContent},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding article.");
      } else {
        res.send(err);
      }
    }
  );
});



app.listen(5000, function() {
  console.log("Server started on port 5000");
});
