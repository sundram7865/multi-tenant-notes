"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import { useAuth } from "../../components/Auth/AuthContext";
import NoteForm from "../../components/Notes/NoteForm";
import NoteItem from "../../components/Notes/NoteItem";
import UpgradeButton from "../../components/Notes/UpgradeButton";

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteLimitReached, setNoteLimitReached] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      if (user) {
        setNoteLimitReached(user.role === "Member" && res.data.length >= 3);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = (newNote) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    if (user) setNoteLimitReached(user.role === "Member" && updatedNotes.length >= 3);
  };

  const removeNote = (id) => {
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
    if (user) setNoteLimitReached(user.role === "Member" && updatedNotes.length >= 3);
  };

  if (!user) return <div className="p-4 text-center text-gray-600">Loading user...</div>;
  if (loading) return <div className="p-4 text-center text-gray-600">Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Notes Dashboard</h1>
        <Link
          href="/users"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Manage Users
        </Link>
      </div>

      {/* Upgrade Button */}
      {user.role === "Admin" && noteLimitReached && (
        <div className="mb-4 flex justify-center">
          <UpgradeButton tenantSlug={user.tenant} onUpgrade={fetchNotes} />
        </div>
      )}

      {/* Note Form */}
      {!noteLimitReached && (
        <div className="mb-6">
          <NoteForm onAdd={addNote} />
        </div>
      )}

      {/* Notes List */}
      <div className="grid gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              onDelete={removeNote}
              className="bg-white shadow-md rounded-lg p-4"
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No notes yet. Start by adding one!</p>
        )}
      </div>
    </div>
  );
}
