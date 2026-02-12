import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteModel = ({ closedModel,addNote,currentNote,editNote}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentNote){
      editNote({ _id: currentNote._id, title, description });
    } else {
    addNote({ title, description });
    }

  };

  useEffect(()=>{
    if(currentNote){
      setTitle(currentNote.title);
      setDescription(currentNote.description)
    }
  },[currentNote])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Background Overlay (Home page visible) */}
      <div
        onClick={closedModel}
        className="absolute inset-0 bg-black/40"
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
          {currentNote ? "Edit Note " : "Add New Note"}

        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            
            {/* Cancel */}
            <button
              type="button"
              onClick={closedModel}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>

            {/* Add Note */}
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
             {currentNote ? "Update Note" : "Add note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModel;
