import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReply, deleteReply } from '../redux/actions';

const Reply = ({ reply, parentId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);

  const handleEdit = () => {
    if (editText.trim() !== reply.text) {
      dispatch(editReply(parentId, reply.id, editText));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteReply(parentId, reply.id));
  };

  return (
    <div className="comment reply">
      <div className="comment-header">
        <span className="comment-author">{reply.name}</span>
        <span className="comment-date">{new Date(reply.date).toLocaleString()}</span>
      </div>
      {isEditing ? (
        <textarea 
          value={editText} 
          onChange={(e) => setEditText(e.target.value)} 
          onBlur={handleEdit}
          className="edit-input"
          autoFocus
        />
      ) : (
        <p className="comment-text">{reply.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={() => {
          setEditText(reply.text);
          setIsEditing(true);
        }} className="action-button">Edit</button>
        <button onClick={handleDelete} className="action-button delete">Delete</button>
      </div>
    </div>
  );
};

export default Reply;