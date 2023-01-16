export const REQUEST_COIN = 'REQUEST_COIN';
export const ADD_PERSONAL_INFO = 'ADD_PERSONAL_INFO';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const VALUE_CURRENCY = 'VALUE_CURRENCY';
export const DELETE_TABLE = 'DELETE_TABLE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
const url = 'https://economia.awesomeapi.com.br/json/all';

export const requestMoeda = (payload) => ({
  type: REQUEST_COIN,
  payload,
});

export const addPersonal = (personalInfo) => ({
  type: ADD_PERSONAL_INFO,
  payload: { ...personalInfo },
});

export const deleteTableExpense = (id, expenses) => ({
  type: DELETE_TABLE,
  payload: expenses.filter((index) => index.id !== id),
});

export const selectedCurrency = (payload) => ({
  type: VALUE_CURRENCY,
  payload,
});

export const fetchCoin = () => async () => {
  const promise = await fetch(url);
  const response = await promise.json();
  return response;
};

export const updateExpense = () => ({
  type: UPDATE_EXPENSE,
});

export const saveExpense = (wallet) => ({
  type: SAVE_EXPENSE,
  payload: { ...wallet },
});

export const fetchByCoin = () => async (dispatch) => {
  const promise = await fetch(url);
  const response = await promise.json();
  const filtrededCoins = Object.keys(response).filter((currency) => currency !== 'USDT');
  dispatch(requestMoeda(filtrededCoins));
};
