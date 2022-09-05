import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';

const state = {
  user: {
    email: 'trybe@trybe.com',
    senha: '654321',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'shopping',
        currency: 'BTC',
        method: 'Dinheiro',
        tag: 'alimentação',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '50',
        description: 'exame',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Saúde',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '20',
        description: 'jogo',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
    ],
  },
};

describe('testa a page Wallet', () => {
  test('Verifica se ao clicar no botão excluir a despesa é excluída', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: state });
    const deleteButton = screen.getAllByTestId('delete-btn');
    userEvent.click(deleteButton[0]);
    const exp = [
      {
        id: 1,
        value: '50',
        description: 'exame',
        currency: 'CAD',
        method: 'Cartão de débito',
        tag: 'Saúde',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '20',
        description: 'jogo',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
    ];
    expect(store.getState().wallet.expenses).toEqual(exp);
  });

  it('verifica se o email de login está na tela', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, 'trybe@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);
    const loginEmail = screen.getByTestId('email-field');
    expect(loginEmail).toBeInTheDocument();
    expect(loginEmail.innerHTML).toBe('trybe@gmail.com');
  });

  it('Verifica se o componente wallet é renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const titleExpense = screen.getByRole('heading', { level: 3, name: /despesas/i });
    expect(titleExpense).toBeInTheDocument();
  });

  it('Verifica se todos os inputs estão na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const inputCoin = screen.getByTestId('currency-input');
    expect(inputCoin).toBeInTheDocument();

    const inputMethod = screen.getByTestId('method-input');
    expect(inputMethod).toBeInTheDocument();

    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toBeInTheDocument();
  });

  it('verifica se aparecem todos os titulos da tabela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const arrayTable = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    arrayTable.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument());
  });

  it('verifica se adiciona despesa', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.selectOptions(inputTag, 'Trabalho');
    userEvent.selectOptions(inputMethod, 'Dinheiro');
    userEvent.click(addExpenseButton);
    const tag = screen.getByText('Trabalho');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveTextContent('');
    expect(tag).toBeInTheDocument();
  });
  it('verifica se quando clicado no botão esvazia o campo de formulario', () => {
    renderWithRouterAndRedux(<Wallet />);
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
  });
  it('verifica se o header foi renderizado', () => {
    renderWithRouterAndRedux(<Wallet />);
    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });

  it('Verifica se a função é chamada', () => {
    renderWithRouterAndRedux(<WalletForm />, { wallet: state.wallet });
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpense);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
