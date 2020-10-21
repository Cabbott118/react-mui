import {
  SET_POSTS,
  SET_POST,
  ADD_POST,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  LOADING_DATA,
  SUBMIT_COMMENT,
  GET_USERNAMES,
} from '../types';

const initialState = {
  posts: [],
  post: {},
  usernames: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_USERNAMES:
      return {
        ...state,
        usernames: action.payload,
        loading: false,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      let indexd = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(indexd, 1);
      return {
        ...state,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
