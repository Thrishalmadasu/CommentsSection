import React, { useState } from 'react';

const CommentForm = ({ onSubmit, onCancel, initialName = '', initialText = '' }) => {
  const [name, setName] = useState(initialName);
  const [text, setText] = useState(initialText);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('Please fill in both name and comment fields.');
      return;
    }
    onSubmit(name, text);
    setName('');
    setText('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="input-field"
      />
      <textarea 
        placeholder="Comment" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="input-field"
      />
      {error && <p className="error-message">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="post-button">POST</button>
        {onCancel && <button type="button" onClick={onCancel} className="cancel-button">CANCEL</button>}
      </div>
    </form>
  );
};

export default CommentForm;