"use client";

export default function NoteItem({ note, onDelete }) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <h2 className="font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <button
        onClick={() => onDelete(note._id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
