import { FaEdit, FaTrash } from "react-icons/fa";

export default function NoteCard({ note,onEdit,deleteNote }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition duration-300">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {note.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        {note.description}
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        
        {/* Edit Button */}
        <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition" onClick={()=>onEdit(note)}>
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition" onClick={()=>deleteNote(note._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
