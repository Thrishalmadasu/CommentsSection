import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, setComments } from '../redux/actions';
import CommentForm from './CommentForm';
import Comment from './Comment';
import './CommentSection.css';

const CommentSection = () => {
  const comments = useSelector(state => state.comments);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      dispatch(setComments(JSON.parse(savedComments)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (name, text) => {
    dispatch(addComment(name, text));
  };

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'newest' 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="comment-section">
      <CommentForm onSubmit={handleAddComment} />
      <div className="sort-control">
        <label>Sort by: </label>
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
      <div className="comments-list">
        {sortedComments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;