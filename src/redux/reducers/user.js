import { SAVE_EMAIL } from '../actions';

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default: return state;
  }
};

export default user;
