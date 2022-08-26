// Coloque aqui suas actions
export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
export const MANAGE_WALLET = 'MANAGE_WALLET';

export const getUserAction = (payload) => ({
  type: GET_USER_INFORMATION,
  payload,
});

export const manageWalletAction = (payload) => ({
  type: GET_USER_INFORMATION,
  payload,
});
