import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTags } from "../api/tagService";
import { createEntry, updateEntry } from "../api/diaryService";
import { DiaryEntry } from "../types/DiaryEntry";

import "react-quill/dist/quill.snow.css"; // Import the CSS for Quill
import ReactQuill from "react-quill";

interface DiaryEntryFormProps {
  entry?: DiaryEntry;
}

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({ entry }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(entry?.tags || []);
  const [content, setContent] = useState(entry?.content || "");
  const [title, setTitle] = useState(entry?.title || "");
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entry) {
      setSelectedTags(entry.tags || []);
      setTitle(entry.title || "");
      setContent(entry.content || "");
      if (contentRef.current) {
        contentRef.current.innerHTML = entry.content || "";
      }
    }
  }, [entry]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data.map((tag) => tag.name));
      } catch (error) {
        console.error("Failed to fetch tags:", error);
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
      const entryData = {
        title,
        tags: selectedTags,
        content: content,
      };
      if (entry) {
        if (entry.id) {
          await updateEntry(entry.id, entryData);
        } else {
          console.error("Entry ID is undefined");
        }
        navigate(`/view/${entry.id}`, { state: { entry: entryData } });
      } else {
        const createdEntry = await createEntry(entryData);
        navigate(`/view/${createdEntry.id}`, {
          state: { entry: createdEntry },
        });
      }
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  const applyStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="container my-4">
      <div className="card h-100 p-3">
        <div
          className="d-flex justify-content-between"
          style={{ backgroundColor: "antiquewhite" }}
        >
          <div className="text-muted text-start p-2">
            <small className="text-muted">
              {entry
                ? `${
                    entry.date
                      ? new Date(entry.date).toLocaleDateString("en-GB")
                      : "Invalid Date"
                  }`
                : `${new Date().toLocaleDateString("en-GB")}`}
              <br />
              {selectedTags.length > 0 ? selectedTags.join(", ") : "..."}
            </small>
          </div>

          <div className="d-flex align-items-center">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              onClick={handleSubmit}
            >
              <i className="bi bi-save"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <div className="text-center mt-3">Tags</div>
              <hr style={{ margin: "10px 0" }} />
              <div
                className="d-flex flex-column align-items-start"
                style={{ marginTop: "1 rem" }}
              >
                {tags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`btn btn-sm btn-outline-success mb-1 ${
                      selectedTags.includes(tag) ? "active" : ""
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <input
              type="text"
              className="form-control mb-3 text-center text-muted"
              placeholder="How was your day?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ fontSize: "1.25rem" }}
            />

            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write something amazing..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryForm;
