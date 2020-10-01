import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notes from '../notes';
import CreateArea from './CreateArea';
import axios from 'axios';


function App() {

  var [notes, setNotes] = useState([]);

  // Call load notes on render
  React.useEffect(() => {
    loadNotes();
  }, []);

  // Retreive note data from api then set notes variable  
  function loadNotes() {
      axios.get('https://u4fqzfwd0c.execute-api.us-east-1.amazonaws.com/prod/note').then(
        res =>{ const reply = res.data;
            setNotes(reply);
        }
    );
  }

  
  /* Add Note - sends post request API */
  async function addNote(newNote, event) {
    //setNotes(prevNotes => {
    //  return [...prevNotes, newNote];
    // });
    console.log(newNote);
    let randId = Math.floor(Math.random() * Math.floor(100000));
    let randIdString = randId.toString();
    try {
        const params = {
            "id": randIdString,
            "title": newNote.title,
            "content": newNote.content
        }
        await axios.post('https://u4fqzfwd0c.execute-api.us-east-1.amazonaws.com/prod/note', params);
        loadNotes();
    } catch (err) {
        console.log(err);
    }
  }

// ----- DELETE NOT IMPLEMENTED --------
  async function deleteNote(id) {
    alert("Sorry, delete has not been implemented."); /*
  //   setNotes(prevNotes => {
  //    return prevNotes.filter((noteItem, index) => {
  //	return index !== id;
  //    })
  //  });

    console.log("Trying to delete note id: " + id);

    try {
        await axios.delete('https://u4fqzfwd0c.execute-api.us-east-1.amazonaws.com/prod/note/102');
    } catch (err) {
        console.log(err);
    } */
  }


  return <div>
    <Header/>
    <CreateArea onAdd={addNote}/>
    {notes.map((noteItem, index) => {
      return <Note
	key={index}
	id={index}
	title={noteItem.title}
	content={noteItem.content}
	onDelete={deleteNote} />;
    })}
    <Footer/>
  </div>
}

export default App;
