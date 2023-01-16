import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTableExpense, updateExpense } from '../redux/actions/index';

class Table extends Component {
  buttonDelete = (id) => {
    const { expenses, dispatch } = this.props;
    dispatch(deleteTableExpense(id, expenses));
    dispatch(updateExpense());
  };

  tabela = () => {
    const { expenses } = this.props;
    const walletTable = expenses.map((index) => {
      const { id, value, description, method, tag, currency, exchangeRates } = index;
      const valueConverted = +exchangeRates[currency].ask;
      const valor = +value;
      const valorTotalConverted = valueConverted * valor;

      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{valor.toFixed(2)}</td>
          <td>{valueConverted.toFixed(2)}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{valorTotalConverted.toFixed(2)}</td>
          <td>REAL</td>
          <td>
            <button type="button" data-testid="edit-btn">Editar</button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => { this.buttonDelete(id); } }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return walletTable;
  };

  render() {
    return (
      <div>
        Table
        <table data-testid="table">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Câmbio utilizado</th>
              <th>Moeda de conversão</th>
              <th>Valor convertido</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {this.tabela()}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.user,
    ...state.wallet,
  };
};
export default connect(mapStateToProps)(Table);
