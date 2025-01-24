import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DiaryEntryFormPage from './pages/DiaryEntryFormPage';
import DiaryEntryListPage from './pages/DiaryEntryListPage';
import DiaryEntryViewPage from './pages/DiaryEntryViewPage';
import Navbar from './components/Navbar';
import './App.css';
import Tags from './components/Tags';
import DiaryEntryEditPage from './pages/DiaryEntryEditPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/form" element={<DiaryEntryFormPage />} />
            <Route path="/list" element={<DiaryEntryListPage />} />
            <Route path="/view/:id" element={<DiaryEntryViewPage />} />
            <Route path="/edit/:id" element={<DiaryEntryEditPage />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/" element={
              <>
                <h2>Welcome to the Diary App</h2>
                <p>Please navigate to the diary entry form or list.</p>
                <div>
                  <Link to="/form">
                    <button className="btn btn-primary m-2">Add Entry</button>
                  </Link>
                  <Link to="/list">
                    <button className="btn btn-secondary m-2">Show List</button>
                  </Link>
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;