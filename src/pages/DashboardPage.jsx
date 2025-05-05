import { useEffect, useState } from "react";
import { deleteNote, getMyNotes, searchNotes } from "../services/notesService";
import NoteCard from "../components/notes/NoteCard";
import CreateNote from "./CreateNote";
import iconAdd from "../assets/iconAdd.png";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const fetchNotes = async () => {
    try {
      const data = await getMyNotes();
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError("Failed to delete note.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchNotes();
      return;
    }

    try {
      const data = await searchNotes(searchQuery);
      setNotes(data.notes || []);
    } catch (err) {
      console.error("Failed to search notes:", err);
      setError("Failed to search notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loadingNotes)
    return (
      <div className="text-center mt-10 text-xl">Loading user notes...</div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="bg-[#EDF4EC] min-h-screen px-4 py-8 lg:px-38 lg:py-8">

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 lg:flex lg:items-center lg:justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes by title, content, or tags"
          className="bg-white w-67 h-11 border border-[#DDDDE4] px-4 py-3 rounded-full lg:w-166 lg:h-11"
        />
        <button
          type="submit"
          className="bg-[#191923] text-white px-3 py-2 rounded-full hover:shadow-lg transition lg:px-7 lg:py-2 ml-4"
        >
          Search
        </button>
      </form>

      <h1 className="text-[#191923] text-xl font-bold mb-6 lg:text-2xl">All Notes</h1>

      {/* Button to Open Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row items-center justify-center bg-[#F5F7FA] border border-dashed boarder-[#DDDDE4] p-5 text-base font-medium text-[#3D3D3D] w-90 h-20 hover:bg-gray-300 transition 
        lg:w-98 lg:h-70"
      >
        Create a new note
        <img src={iconAdd} alt="icon add" className="h-6 w-6 ml-2"/>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking on the backdrop
        >
          <div
            className="relative mx-auto py-6 px-6 shadow-lg rounded-xl lg:w-132"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-12 right-2 text-gray-500 hover:text-gray-700 h-6 w-6"
            >
              ✖
            </button>
            <CreateNote
              onNoteAdded={() => {
                fetchNotes();
                setIsModalOpen(false); // Close modal after note is added
              }}
            />
          </div>
        </div>
      )}

      {Array.isArray(notes) && notes.length === 0 ? (
        <p className="text-gray-600 mt-6">You have no notes yet. Start writing!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
