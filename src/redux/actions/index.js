// Coloque aqui suas actions
import getApiCurrencies from '../../tests/helpers/fetchApi';

export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
// export const MANAGE_WALLET = 'MANAGE_WALLET';
// export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'GET_CURRENCIES_FAILURE';

export const getUserAction = (payload) => ({
  type: GET_USER_INFORMATION,
  payload,
});

// export const manageWalletAction = (payload) => ({
//   type: MANAGE_WALLET,
//   payload,
// });

// export const getCurrencies = () => ({
//   type: GET_CURRENCIES,
// });

export const getCurrenciesSuccess = (payload) => ({
  type: GET_CURRENCIES_SUCCESS,
  payload,
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});

export function getCurrenciesThunk() {
  return async (dispatch) => {
    // dispatch(getCurrencies());
    try {
      const currenciesApi = await getApiCurrencies();
      dispatch(getCurrenciesSuccess(currenciesApi));
    } catch (e) {
      console.log(e);
      dispatch(getCurrenciesFailure(e.message));
    }
  };
}
