import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  somaDespesas = () => {
    let sum = 0;
    const { expenses } = this.props;
    expenses.forEach((item) => {
      const expenseValue = Number(item.value);
      // const { coin } = item;
      const expenseAsk = item.exchangeRates[item.currency].ask;
      sum += expenseValue * expenseAsk;
    });
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{ this.somaDespesas() }</p>
        <p data-testid="email-field">{ email }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
