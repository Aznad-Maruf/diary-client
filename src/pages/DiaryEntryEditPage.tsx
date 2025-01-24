import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEntryById } from '../api/diaryService';
import DiaryEntryForm from '../components/DiaryEntryForm';
import { DiaryEntry } from '../types/DiaryEntry';

const DiaryEntryEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        return;
      }
      try {
        const data = await getEntryById(id);
        setEntry(data);
      } catch (error) {
        console.error('Failed to fetch entry:', error);
      }
    };

    fetchEntry();
  }, [id]);

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <DiaryEntryForm entry={entry} />
    </div>
  );
};

export default DiaryEntryEditPage;