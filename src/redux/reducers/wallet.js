import { REQUEST_COIN, UPDATE_EXPENSE, DELETE_TABLE, SAVE_EXPENSE } from '../actions';

const STATE_OPEN = {
  expenses: [],
  currencies: [],
  total: 0,
  valueCurrency: 0,
};

const wallet = (state = STATE_OPEN, { type, payload }) => {
  switch (type) {
  case REQUEST_COIN:
    return {
      ...state,
      currencies: payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
      total: state.total + (payload.value
          * +payload.exchangeRates[payload.currency].ask),
    };

  case UPDATE_EXPENSE:
    return {
      ...state,
      total: state.expenses.reduce((initialValue, currentValue) => initialValue
      + (currentValue.value
        * currentValue.exchangeRates[currentValue.currency].ask), 0),
    };
  case DELETE_TABLE:
    return {
      ...state,
      expenses: payload,
    };

  default: return state;
  }
};

export default wallet;
