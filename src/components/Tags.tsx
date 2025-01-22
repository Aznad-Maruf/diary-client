import React, { useEffect, useState } from 'react';
import { getTags, createTag } from '../api/tagService';
import { Tag } from '../types/Tag';
import { Modal, Button, Form } from 'react-bootstrap';

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveTag = async () => {
    try {
      await createTag({ name: newTagName });
      const data = await getTags();
      setTags(data);
      setNewTagName('');
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  return (
    <div className="tags">
        <div className="d-flex justify-content-center mb-3">
            <Button
                variant="primary"
                onClick={handleShowModal}
                className="rounded-circle mb-3"
                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                +
            </Button>
        </div>
      {tags.map((tag) => (
        <div className='d-flex justify-content-center'>
            <span key={tag.id} className="badge bg-success m-1 p-2" style={{ fontSize: '1.2rem' }}>
                {tag.name}
            </span>
        </div>
        
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTagName">
              <Form.Control
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter tag name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTag}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tags;