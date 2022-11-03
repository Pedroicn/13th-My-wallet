import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { atualizaDespesas, getCurrenciesThunk, getExpensesData } from '../redux/actions';
import getApiCurrencies from '../tests/helpers/fetchApi';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
  }

  componentDidUpdate(prevState) {
    const { editor } = this.props;
    if (prevState.editor !== editor) {
      this.editExpense();
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleExpenses = async () => {
    const { dispatch, expenses, editor, idToEdit } = this.props;
    const fetchCoins = await getApiCurrencies();
    if (editor) {
      const expenseEdited = expenses
        .map((expense) => {
          if ((expense.id === idToEdit)) {
            return this.state;
          }
          return expense;
        });
      dispatch(atualizaDespesas(expenseEdited));
    } else {
      this.setState({
        exchangeRates: fetchCoins,
        id: expenses.length,
      }, () => dispatch(getExpensesData(this.state)));
    }
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editExpense = () => {
    const { editor, expenses, idToEdit } = this.props;
    if (editor) {
      const modifyExpense = expenses.find((expense) => expense.id === idToEdit);
      this.setState({
        ...modifyExpense,
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <section className="inputsExpense">
        <div className="inputs first-input">
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
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
        </div>
        <div className="inputs second-input">
          <label htmlFor="select-coin">
            Selecione a moeda:
            <select
              name="currency"
              data-testid="currency-input"
              id="select-coin"
              onChange={ this.handleChange }
              value={ currency }
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
              name="method"
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Seleciona a categoria:
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            className="buttons"
            type="button"
            onClick={ this.handleExpenses }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(WalletForm);
