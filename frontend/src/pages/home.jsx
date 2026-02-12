import Navbar from "../../components/navbar.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';




import NotesModel from "../../components/NotesModel.jsx";
import {useState,useEffect} from 'react'
import NoteCard from "../../components/NoteCard.jsx";



export default function Home (){
    const [isModelOpen,setModelOpen]=useState(false)
    const [notes,setNotes]=useState([])
    const [currentNote,setCurrentNote]=useState(null);
    const [filteredNotes,setFilteredNote]=useState([]);
    const[query,setQuery]=useState('');


    const navigate = useNavigate();


    useEffect(()=>{
      fetchNotes();
    },[]);

    useEffect(()=>{
      const trimmedQuery = query.trim().toLowerCase();
      if (!trimmedQuery) {
        setFilteredNote(notes);
        return;
      }
      setFilteredNote(
        notes.filter((note) => {
          const title = note.title?.toLowerCase() || "";
          const description = note.description?.toLowerCase() || "";
          return title.includes(trimmedQuery) || description.includes(trimmedQuery);
        })
      );
    },[query,notes]);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchNotes = async ()=>{
      try {
        const{data} = await axios.get(`${apiUrl}/api/note`, {
          headers :{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        setNotes(data.notes || [])
      } catch(error){
          console.log(error.response?.data || error.message)
      }
    }

    const closedModel=()=>{
        setModelOpen(false);
        setCurrentNote(null);
    }


    const onEdit=async(note)=>{
      setCurrentNote(note);
      setModelOpen(true);
    }


    const addNote = async({title,description})=>{
        try {
            const response = await axios.post(
              `${apiUrl}/api/note/add`,
              { title, description },{
                headers :{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              }
            );
      
            if (response.data.success) {
              fetchNotes();
              closedModel();
              navigate("/");
              toast.success("Note Created")
            }
          } catch (error) {
            console.log(error.response?.data || error.message);
          }
    }

    const editNote= async({_id,title,description})=>{
      try {
        const response = await axios.put(
          `${apiUrl}/api/note/${_id}`,
          { title, description },{
            headers :{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
        );
  
        if (response.data.success) {
          fetchNotes();
          closedModel();
          navigate("/");
          toast.success("Note Edited")
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    const deleteNote = async(id)=>{
      try {
        const response = await axios.delete(
          `${apiUrl}/api/note/${id}`,
         {
            headers :{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          } 
        );
  
        if (response.data.success) {
          fetchNotes();
          closedModel();
          navigate("/");
          toast.success("Note deleted")
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
    return (
        <div>
        <Navbar setQuery={setQuery}/>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard  note={note} 
           onEdit={onEdit}
           deleteNote={deleteNote}/>
              )): <p>No Notes</p>}
            </div>

                <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl font-bold shadow-lg hover:bg-blue-700 transition duration-300" onClick={()=>{setCurrentNote(null); setModelOpen(true)}}> + </button>
             
        
        {isModelOpen && <NotesModel closedModel={closedModel} addNote={addNote} currentNote={currentNote}
        editNote={editNote}/>}
       </div>

        
    )}
