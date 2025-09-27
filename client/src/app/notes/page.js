"use client";

import { useEffect, useState } from "react";
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
    if (!user) return; // Wait until user is loaded
    fetchNotes();
  }, [user]);

  // Fetch notes for current tenant
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);

      // Check note limit only for Members
      if (user) {
        setNoteLimitReached(user.role === "Member" && res.data.length >= 3);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new note
  const addNote = (newNote) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);

    // Check note limit
    if (user) setNoteLimitReached(user.role === "Member" && updatedNotes.length >= 3);
  };

  // Remove note
  const removeNote = (id) => {
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);

    if (user) setNoteLimitReached(user.role === "Member" && updatedNotes.length >= 3);
  };

  if (!user) return <div className="p-4">Loading user...</div>;
  if (loading) return <div className="p-4">Loading notes...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Notes Dashboard</h1>

      {/* Show upgrade button for Admin if note limit reached */}
      {user.role === "Admin" && noteLimitReached && (
        <div className="mb-4">
          <UpgradeButton tenantSlug={user.tenant} onUpgrade={fetchNotes} />
        </div>
      )}

      {/* Show note form only if limit not reached */}
      {!noteLimitReached && <NoteForm onAdd={addNote} />}

      <div className="mt-6 grid gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} onDelete={removeNote} />
          ))
        ) : (
          <p>No notes yet.</p>
        )}
      </div>
    </div>
  );
}
