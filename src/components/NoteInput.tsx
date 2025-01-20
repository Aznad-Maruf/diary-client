import React, { useState } from 'react';
import './NoteInput.css';

interface NoteInputProps {
  onAddNote: (text: string) => void;
}

function NoteInput({ onAddNote }: NoteInputProps) {
  const [text, setText] = useState('');

  const handleAddNote = () => {
    if (text.trim() !== '') {
      onAddNote(text);
      setText('');
    }
  };

  return (
    <div className="note-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default NoteInput;