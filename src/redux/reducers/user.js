import { GET_USER_INFORMATION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFORMATION:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
