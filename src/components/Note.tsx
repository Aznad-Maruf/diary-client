import React from 'react';
import './Note.css';

interface NoteProps {
  note: {
    id: number;
    text: string;
  };
  onDelete: (id: number) => void;
}

function Note({ note, onDelete }: NoteProps) {
  return (
    <div className="note">
      <p>{note.text}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
}

export default Note;