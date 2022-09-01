import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <section>
        <caption>
          <h3>Despesas</h3>
        </caption>
        <table border="1">
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

        </table>
      </section>
    );
  }
}

export default Table;
