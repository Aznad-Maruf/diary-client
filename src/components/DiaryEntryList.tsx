import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEntries } from '../api/diaryService';
import { DiaryEntry } from '../types/DiaryEntry';
import { formatDate } from '../utils';

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
      <h2 className="mb-4 text-center">Diary Entries</h2>
      <div className="row">
        {entries.map((entry) => (
          <div key={entry.id} className="col-md-4 mb-4">
            <Link to={`/view/${entry.id}`} state={{ entry }} className="text-decoration-none">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title text-center">{entry.title}</h5>
                    <small className="text-muted">
                      {formatDate(entry.date)}
                      </small>
                  </div>
                  <small className="text-muted">
                    {entry.tags?.join(', ') || 'No tags'}
                  </small>
                  <div className="mt-auto text-center">
                    <p className="card-text mt-3">{entry.content}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntryList;
