// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
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
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  // case GET_SUM:
  //   return {
  //     ...state,
  //     sum: state.expenses.map((item) => item.value),
  //     // .reduce((a, b) => Number(a) + Number(b)),
  //   };
  case GET_CURRENCIES_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
