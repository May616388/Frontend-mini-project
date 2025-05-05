import { useState } from "react";
import { createNote } from "../services/notesService";
import catSit from "../assets/catSit.png";
import iconPin from "../assets/iconPin.png";

const CreateNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // New state for tags
  const [isPinned, setIsPinned] = useState(false); // New state for pin state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newNote = await createNote({
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert tags string to array
        isPinned,
      });
      setTitle("");
      setContent("");
      setTags("");
      setIsPinned(false);
      if (onNoteAdded) onNoteAdded(newNote); // Trigger re-fetch or update notes
    } catch (err) {
      console.error("Failed to create note:", err);
      setError("Failed to create note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div className="bg-white w-90 mx-auto py-6 px-6 shadow-lg rounded-xl lg:w-132">
      <div className="flex flex-row">
      <h1 className="text-xl font-bold mb-4 mr-2">Create a New Note</h1>
        <img src={catSit} alt="Cat" className="w-6 h-6 lg:w-6 lg:h-6"/>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 w-full mt-4 ">
        <div>
          <label className="block mb-2 font-normal text-base text-[#191923]">Title</label>
          <input
            type="text"
            className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-lg focus:ring focus:ring-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
        </div>

        <div>
          <label className="block mb-2 font-normal text-base text-[#191923]">Content</label>
          <textarea
            className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-lg focus:ring focus:ring-gray-600 min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Content"
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-normal text-base text-[#191923]">Tags</label>
          <input
            type="text"
            className="bg-[#F5F7FA] mt-2 block w-full px-4 py-3 border border-[#DDDDE4] rounded-lg focus:ring focus:ring-gray-600"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPinned"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="mr-4 bg-[#F5F7FA] h-4 w-4"
          />
          <img src={iconPin} alt="pin" className="h-5 w-5 mr-2"/>
          <label htmlFor="isPinned" className="font-medium text-[#191923]">
            Pin this note
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full h-12 bg-[#191923] hover:shadow-lg text-white font-medium text-base py-2 rounded-full transition duration-300"
        >
          {loading ? "Saving..." : "Create Note"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateNote;
