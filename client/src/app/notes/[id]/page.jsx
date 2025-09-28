"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // for Next 13+ app router
import api from "../../../services/api";                // adjust path if using /pages

export default function SingleNotePage() {
  const { id } = useParams();
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Failed to load note:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);


  const handleUpdate = async () => {
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      alert("Note updated!");
      router.push("/notes"); // go back to notes list
    } catch (err) {
      console.error("Failed to update note:", err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading note...</div>;
  if (!note)   return <div className="p-4">Note not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      <div className="bg-white p-4 rounded shadow max-w-lg">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          className="border w-full p-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          className="border w-full p-2 h-40 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
