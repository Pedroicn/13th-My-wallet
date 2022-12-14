// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// novo commit
import {
  EDIT_EXPENSE,
  ATUALIZA_DESPESA,
  GET_EXPENSES,
  GET_CURRENCIES_FAILURE,
  GET_CURRENCIES_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: null,
  sum: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((item) => item !== 'USDT'),
      error: null,
      editor: false,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editor: false,
    };
  case ATUALIZA_DESPESA:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  case GET_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
