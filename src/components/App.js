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

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
	return index !== id;
      })
    });   
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
