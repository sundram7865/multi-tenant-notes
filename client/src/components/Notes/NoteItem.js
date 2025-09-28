"use client";

import Link from "next/link";

export default function NoteItem({ note, onDelete }) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div className=" text-gray-900">
        <h2 className="font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>

      <div className="flex gap-2">
    
        <Link
          href={`/notes/${note._id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
