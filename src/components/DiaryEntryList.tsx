import React, { useEffect, useState } from 'react';
import { getEntries } from '../api/diaryService';

interface DiaryEntry {
  id?: string;
  title: string;
  content: string;
  tags?: string[];
  date: string;
  deleted: boolean;
}

const DiaryEntryList: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getEntries();
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Diary Entries</h2>
      <div className="row">
        {entries.map((entry) => (
          <div key={entry.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <p className="card-text">{entry.content}</p>
                <p className="card-text">
                  <strong>Tags:</strong> {entry.tags?.join(', ') || 'No tags'}
                </p>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(entry.date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntryList;
