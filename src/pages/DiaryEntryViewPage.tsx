import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntryById, deleteEntry } from '../api/diaryService';
import { DiaryEntry } from '../types/DiaryEntry';
import { formatDate } from '../utils';

const DiaryEntryViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        setError('Invalid entry ID');
        setLoading(false);
        return;
      }
      try {
        const data = await getEntryById(id);
        setEntry(data);
      } catch (err) {
        setError('Failed to fetch entry');
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const navigate = useNavigate();

    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this entry?')) {
        try {
          if (id) {
            await deleteEntry(id);
          } else {
            setError('Invalid entry ID');
          }
          navigate('/list');
        } catch (err) {
          setError('Failed to delete entry');
        }
      }
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!entry) {
    return <p>No entry found.</p>;
  }

  return (
    <div className="container my-4">
      <div className="card h-100 p-3">
        <div className='text-muted text-end'>
        <small className="text-muted text-end">
            {formatDate(entry.date)}
          <br/>
          {entry.tags?.join(', ') || 'No tags'}
        </small>
        </div>
        
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-center flex-grow-1">{entry.title}</h5>
          </div>
          
          <div className="mt-auto text-center">
            <p className="card-text mt-3">{entry.content}</p>
          </div>
        </div>
      </div>

    <div className="text-end mt-3">
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
    </div>
  );
};

export default DiaryEntryViewPage;