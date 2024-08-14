export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SET_COMMENTS = 'SET_COMMENTS';
export const EDIT_REPLY = 'EDIT_REPLY';
export const DELETE_REPLY = 'DELETE_REPLY';


export const addComment = (name, text) => ({
  type: ADD_COMMENT,
  payload: { name, text, date: new Date().toISOString() }
});

export const addReply = (parentId, name, text) => ({
  type: ADD_REPLY,
  payload: { parentId, name, text, date: new Date().toISOString() }
});

export const editComment = (id, text) => ({
  type: EDIT_COMMENT,
  payload: { id, text }
});

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: { id }
});


export const setComments = (comments) => ({
    type: SET_COMMENTS,
    payload: comments
  });

export const editReply = (parentId, replyId, text) => ({
    type: EDIT_REPLY,
    payload: { parentId, replyId, text }
});
  
export const deleteReply = (parentId, replyId) => ({
    type: DELETE_REPLY,
    payload: { parentId, replyId }
});