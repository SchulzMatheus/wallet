export const SAVE_EMAIL = 'SAVE_EMAIL';

export const userEmailSaver = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});
