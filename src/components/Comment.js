import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply } from '../redux/actions';
import CommentForm from './CommentForm';
import Reply from './Reply';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleEdit = () => {
    if (editText.trim() !== comment.text) {
      dispatch(editComment(comment.id, editText));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">{comment.name}</span>
        <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
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
        <p className="comment-text">{comment.text}</p>
      )}
      <div className="comment-actions">
        <button onClick={() => setIsReplying(!isReplying)} className="action-button">Reply</button>
        <button onClick={() => {
          setEditText(comment.text);
          setIsEditing(true);
        }} className="action-button">Edit</button>
        <button onClick={handleDelete} className="action-button delete">Delete</button>
      </div>
      {isReplying && (
        <CommentForm 
          onSubmit={(name, text) => {
            dispatch(addReply(comment.id, name, text));
            setIsReplying(false);
          }}
          onCancel={() => setIsReplying(false)}
        />
      )}
      {comment.replies && comment.replies.map(reply => (
        <Reply key={reply.id} reply={reply} parentId={comment.id} />
      ))}
    </div>
  );
};

export default Comment;