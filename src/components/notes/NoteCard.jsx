import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { updateNoteVisibility } from "../../services/notesService";
import iconPin from "../../assets/lets-icons_pin-fill.png"
import iconEdit from "../../assets/icon-edit.png"
import iconDelete from "../../assets/icon-delete.png"

const NoteCard = ({note, onDelete}) => {
    const [isPublic, setIsPublic] = useState(note.isPublic);

    const handleToggleVisibility = async () => {
    try {
      const updatedNote = await updateNoteVisibility(note._id, !isPublic);
      setIsPublic(updatedNote.note.isPublic); // Update local state to trigger re-render
    } catch (err) {
      console.error("Failed to update note visibility:", err);
    }
  };

  return (
     <div className="bg-linear-to-r from-[#D4DEFF] to-[#E7ECFF] shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div>
        {/* Pinned Icon */}
        {note.isPinned && (
          <div className="flex items-center mb-2">
            <span> <img src={iconPin} alt="Pinned Icon" className='h-10 w-10'/></span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3 text-[#3C4AB3] truncate">
          {note.title}
        </h2>

        {/* Content */}
        <p className="text-[#3D3D3D] text-base font-normal line-clamp-4">{note.content}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">

            {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#FFF1EE] text-[#FF6C1F] text-base font-normal px-4 py-2 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Created Date */}
        {/* <span>Created on: {new Date(note.createdOn).toLocaleDateString()}</span> */}

        {/* Actions */}
        <div className="flex space-x-4 items-center">
          {/* <Link
            to={`/notes/${note._id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link> */}
          <Link
            to={`/notes/${note._id}`}>
            <img src={iconEdit} alt="Edit icon" />
          </Link>
          <button
            onClick={() => onDelete(note._id)}>
            <img src={iconDelete} alt="Delete icon" />
          </button>
          <button
            onClick={handleToggleVisibility}
            className={`${
              isPublic
                ? "text-[#3C4AB3] underline-offset-4 hover:text-blue-900"
                : "text-[#3C89FD] underline-offset-4 hover:text-[#3C4AB3]"
            } transition`}
          >
            {isPublic ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard