import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTags } from '../api/tagService';
import { createEntry } from '../api/diaryService';

const DiaryEntryForm: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data.map(tag => tag.name)); // Assuming 'name' is the string representation of the tag
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const entry = { tags: selectedTags, content };
      
      const createdEntry = await createEntry(entry);
      navigate(`/view/${createdEntry.id}`, { state: { entry: createdEntry } });
    } catch (error) {
      console.error('Failed to create entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tags</label>
        <div className="mb-3">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`btn btn-outline-primary m-1 ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          required
          rows={8}
          className="form-control"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default DiaryEntryForm;