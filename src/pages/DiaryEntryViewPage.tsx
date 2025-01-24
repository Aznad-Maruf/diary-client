import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEntryById, deleteEntry } from "../api/diaryService";
import { DiaryEntry } from "../types/DiaryEntry";
import { formatDate } from "../utils";
import "bootstrap-icons/font/bootstrap-icons.css";

const DiaryEntryViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        setError("Invalid entry ID");
        setLoading(false);
        return;
      }
      try {
        const data = await getEntryById(id);
        setEntry(data);
      } catch (err) {
        setError("Failed to fetch entry");
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        if (id) {
          await deleteEntry(id);
        } else {
          setError("Invalid entry ID");
        }
        navigate("/list");
      } catch (err) {
        setError("Failed to delete entry");
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
    <div className="">
      <div className="card h-100 m-3">
        <div
          className="d-flex justify-content-between"
          style={{ backgroundColor: "antiquewhite" }}
        >
          <div className="text-muted text-start p-2">
            <small className="text-muted">
              {formatDate(entry.date)}
              <br />
              {entry.tags?.join(", ") || "..."}
            </small>
          </div>
          <div
            className="d-flex align-items-center p-2"
            style={{ flexGrow: 1 }}
          >
            <h5 className="text-muted text-center w-100">{entry.title}</h5>
          </div>
          <div className=" p-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate(`/edit/${id}`)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDelete}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <div
            className="mt-auto text-left"
            style={{ height: "calc(100vh - 300px)" }}
          >
            <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryViewPage;
