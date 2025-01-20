import React, { useState } from 'react';
import { createEntry } from '../api/diaryService';

interface DiaryEntry {
    id?: string;
    title: string;
    content: string;
    tags: string[];
    date: string;
    deleted: boolean;
  }

const DiaryEntryForm: React.FC = () => {
  const [form, setForm] = useState<DiaryEntry>({
    title: '',
    content: '',
    tags: [],
    date: new Date().toISOString(),
    deleted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, tags: e.target.value.split(',').map((tag) => tag.trim()) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEntry(form);
      setForm({ title: '', content: '', tags: [], date: new Date().toISOString(), deleted: false });
      setForm({ title: '', content: '', tags: [], date: new Date().toISOString(), deleted: false });
    } catch (error) {
      console.error('Failed to create entry:', error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Create New Diary Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows={4}
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={form.tags.join(', ')}
            onChange={handleTagChange}
          />
        </div>
        <div className='d-flex justify-content-end'>
            <button type="submit" className="btn btn-primary">Create Entry</button>
        </div>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
