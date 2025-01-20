import React from 'react';
import DiaryEntryForm from './components/DiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList';

const App: React.FC = () => {
  return (
    <div>
      <header className="bg-primary text-white text-center py-3">
        <h1>Diary App</h1>
      </header>
      <main>
        <DiaryEntryForm />
        <DiaryEntryList />
      </main>
    </div>
  );
};

export default App;
