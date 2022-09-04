import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('Testa o componente Login', () => {
  it('Verifica se existe um botão com o texto entrar', () => {
    renderWithRouterAndRedux(<Login />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton).toBeInTheDocument();
  });
  // it('Verifica se existe um campo de email', () => {
  //   renderWithRouterAndRedux(<Login />);
  //   const emailInput = screen.getByTestId('email-input');
  //   expect(emailInput).toBeInTheDocument();
  // });
  // it('Verifica se existe um campo de senha', () => {
  //   renderWithRouterAndRedux(<Login />);
  //   expect(passwordInput).toBeInTheDocument();
  // });
  it('Verifica se ao clicar no botão é redirecionado para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(emailInput, 'trybe@gmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/carteira');
  });

  it('verifica validação de senha e email', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '123456');
    expect(loginButton).not.toHaveAttribute('disabled');
  });
});
