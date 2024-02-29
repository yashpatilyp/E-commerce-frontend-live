
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGIN_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};