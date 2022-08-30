import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    coin: 'USD',
    paymentMethod: 'Dinheiro',
    category: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
    console.log(dispatch);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const {
      value,
      description,
      coin,
      paymentMethod,
      category,
    } = this.state;
    return (
      <section>
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            name="value"
            value={ value }
            className="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição da despesa:
          <input
            name="description"
            className="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="select-coin">
          Selecione a moeda:
          <select
            name="coin"
            data-testid="currency-input"
            id="select-coin"
            onChange={ this.handleChange }
            value={ coin }
          >
            {
              currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>{ currencie }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
            name="paymentMethod"
            id="method-input"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ paymentMethod }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Seleciona a categoria:
          <select
            name="category"
            id="tag-input"
            data-testid="tag-input"
            value={ category }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(WalletForm);
