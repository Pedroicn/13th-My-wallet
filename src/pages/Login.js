import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserAction } from '../redux/actions';
import carteira from '../img/carteira.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(getUserAction(email));
    history.push('/carteira');
  }

  validateForm() {
    const { senha, email } = this.state;
    const minSenha = 6;
    const validateEmail = /\S+@\S+\.\S+/i.test(email);
    const validateSenha = senha.length >= minSenha;
    const bothValidation = !validateEmail || !validateSenha;
    this.setState({ isDisable: bothValidation });
  }

  render() {
    const { email, senha, isDisable } = this.state;
    return (
      <form onSubmit={ this.handleSubmit } className="login-form">
        <div className="loginImg">
          <img src={ carteira } alt="carteira" />
        </div>
        <h1 className="loginTitle">TrybeWallet</h1>
        <div>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              name="email"
              id="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="senha">
            Senha:
            <input
              data-testid="password-input"
              name="senha"
              id="senha"
              type="password"
              value={ senha }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <button
            className="buttons"
            disabled={ isDisable }
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
