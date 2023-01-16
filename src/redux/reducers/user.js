import { ADD_PERSONAL_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_PERSONAL_INFO: {
    return {
      ...state,
      ...payload,
    };
  }
  default: return state;
  }
};

export default user;
