import { GET_USER_INFORMATION } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFORMATION:
    return;
  default:
    return state;
  }
};

export default user;
