export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CURRENCIES_DATA = 'CURRENCIES_DATA';
const url = 'https://economia.awesomeapi.com.br/json/all';

export const userEmailSaver = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const currenciesData = (payload) => ({
  type: CURRENCIES_DATA,
  payload,
});

export const requestCurrencies = () => async (dispatch) => {
  const currencies = await fetch(url);
  const response = await currencies.json();
  const filteredResponse = Object.keys(response).filter((e) => e !== 'USDT');
  dispatch(currenciesData(filteredResponse));
};
