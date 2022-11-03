import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { atualizaDespesas, editExpenseAction } from '../redux/actions';

class Table extends Component {
  renderizaCambio = (expense) => {
    const cambio = Number(expense.exchangeRates[expense.currency].ask);
    return cambio.toFixed(2);
  };

  renderizaConvercao = (expense) => {
    const convercao = Number(expense.value * expense.exchangeRates[expense.currency].ask);
    return convercao.toFixed(2);
  };

  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(atualizaDespesas(deleteExpense));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenseAction(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <h3 className="tableTitle">Despesas</h3>
        <table className="table" border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>{ this.renderizaCambio(expense) }</td>
                  <td>{ this.renderizaConvercao(expense) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      className="buttons"
                      onClick={ () => this.editExpense(expense.id) }
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="buttons"
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.deleteExpense(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
