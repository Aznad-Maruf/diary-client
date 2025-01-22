import React from 'react';
import DiaryEntryList from '../components/DiaryEntryList';

const DiaryEntryListPage: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1>Diary Entries</h1>
      </header>
      <main>
        <DiaryEntryList />
      </main>
    </div>
  );
};

export default DiaryEntryListPage;