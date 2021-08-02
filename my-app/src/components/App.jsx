import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    // console.log(newNote);
    if(newNote.title !== '' && newNote.content !== '')
    {
      axios.post('http://localhost:5000/notes', JSON.stringify(newNote), {
     headers: {
       'Content-Type': 'application/json'
   }
  })
    .then(response => {
      console.log(response.data);
    });
  }
    // setNotes(prevNotes => {
    //   return [...prevNotes, newNote];
    // });

  }

  function deleteNote(note) {
       axios.delete('http://localhost:5000/notes/'+note.title+'/'+note.content)
    .then(response => {
      console.log(response.data);
    });
    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  axios.get('http://localhost:5000/notes')
  .then(function (response) {
    // handle success
    // console.log(response.data);
    setNotes(response.data);
  })
  .catch(function (error) {
    // handle error
    // console.log(error);
  })
  .then(function () {
    // always executed
  });
  
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
