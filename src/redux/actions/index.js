// Coloque aqui suas actions
export const REQUEST_COIN = 'REQUEST_COIN';
export const ADD_PERSONAL_INFO = 'ADD_PERSONAL_INFO';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const VALUE_CURRENCY = 'VALUE_CURRENCY';
export const DELETE_TABLE = 'DELETE_TABLE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const requestMoeda = (moedaInfo) => ({
  type: REQUEST_COIN,
  payload: moedaInfo,
});

export const addPersonal = (personalInfo) => {
  console.log('chamou action');
  return {
    type: ADD_PERSONAL_INFO,
    payload: { ...personalInfo },
  };
};

export const saveExpense = (wallet) => ({
  type: SAVE_EXPENSE,
  payload: { ...wallet },
});

export const deleteTableExpense = (id, expenses) => ({
  type: DELETE_TABLE,
  payload: expenses.filter((index) => index.id !== id),
});

export const selectedCurrency = (moeda) => ({
  type: VALUE_CURRENCY,
  payload: moeda,
});

export const updateExpense = () => ({
  type: UPDATE_EXPENSE,
});

export const apiComplete = () => async () => {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await fetchAPI.json();
  console.log(json);
  return json;
};

export const fetchMoeda = () => async (dispatch) => {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await fetchAPI.json();
  console.log(json);
  const filterCurrency = Object.keys(json).filter((currency) => currency !== 'USDT');
  dispatch(requestMoeda(filterCurrency));
};
