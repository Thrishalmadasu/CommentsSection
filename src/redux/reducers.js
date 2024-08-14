import { ADD_COMMENT, ADD_REPLY, EDIT_COMMENT, DELETE_COMMENT, SET_COMMENTS , EDIT_REPLY , DELETE_REPLY } from './actions';

const initialState = {
  comments: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, { id: Date.now(), ...action.payload, replies: [] }]
      };
    case ADD_REPLY:
      return {
        ...state,
        comments: state.comments.map(comment => 
          comment.id === action.payload.parentId 
            ? { ...comment, replies: [...comment.replies, { id: Date.now(), ...action.payload }] }
            : comment
        )
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => 
          comment.id === action.payload.id 
            ? { ...comment, text: action.payload.text }
            : comment
        )
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.id)
      };
      case EDIT_REPLY:
        return {
          ...state,
          comments: state.comments.map(comment => 
            comment.id === action.payload.parentId 
              ? {
                  ...comment,
                  replies: comment.replies.map(reply =>
                    reply.id === action.payload.replyId
                      ? { ...reply, text: action.payload.text }
                      : reply
                  )
                }
              : comment
          )
        };
      case DELETE_REPLY:
        return {
          ...state,
          comments: state.comments.map(comment => 
            comment.id === action.payload.parentId 
              ? {
                  ...comment,
                  replies: comment.replies.filter(reply => reply.id !== action.payload.replyId)
                }
              : comment
          )
        };
    default:
      return state;
    
  }
};

export default rootReducer;