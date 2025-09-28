"use client";

import { useState } from "react";
import api from "../../services/api";

export default function NoteForm({ onAdd, disabled }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await api.post("/notes", { title, content });
      onAdd(res.data); // use the correct prop
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded flex-1  text-gray-900"
        disabled={disabled}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border p-2 rounded flex-1  text-gray-900"
        disabled={disabled}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={disabled}
      >
        Add
      </button>
    </form>
  );
}
