import React from 'react';
import DiaryEntryForm from '../components/DiaryEntryForm';

const DiaryEntryFormPage: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h2>How was your day</h2>
      </header>
      <main>
        <DiaryEntryForm />
      </main>
    </div>
  );
};

export default DiaryEntryFormPage;