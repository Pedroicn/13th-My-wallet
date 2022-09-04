// Coloque aqui suas actions
import getApiCurrencies from '../../tests/helpers/fetchApi';

export const GET_USER_INFORMATION = 'GET_USER_INFORMATION';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'GET_CURRENCIES_FAILURE';
export const GET_EXPENSES = 'GET_EXPENSES';
export const ATUALIZA_DESPESA = 'ATUALIZA_DESPESA';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const getUserAction = (payload) => ({
  type: GET_USER_INFORMATION,
  payload,
});

export const getExpensesData = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const atualizaDespesas = (payload) => ({
  type: ATUALIZA_DESPESA,
  payload,
});

export const getCurrenciesSuccess = (payload) => ({
  type: GET_CURRENCIES_SUCCESS,
  payload,
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAILURE,
  error,
});

export const editExpenseAction = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
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
