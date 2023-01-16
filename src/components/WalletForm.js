import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoin, fetchByCoin, saveExpense } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchByCoin());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  coins = () => {
    const { currency } = this.props;
    const optionsMap = currency.map((e) => (
      <option key={ e } value={ e }>
        {e}
      </option>));
    return optionsMap;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await dispatch(fetchCoin());
    const expensesKey = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
      id,
    };
    dispatch(saveExpense(expensesKey));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: id + 1,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor="value-input">
            Valor
            <input
              data-testid="value-input"
              name="value"
              id="value-input"
              value={ value }
              onChange={ this.handleChange }
              type="number"
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              type="text"
            />
          </label>

          <label htmlFor="moeda">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="moeda"
              value={ currency }
              onChange={ this.handleChange }
            >
              {this.coins()}
            </select>
          </label>

          <label htmlFor="metodoDePagamento">
            Método de Pagamento
            <select
              data-testid="method-input"
              name="method"
              id="metodoDePagamento"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
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
        </div>
        <button
          type="submit"
          data-testid="button-add"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currency: PropTypes.arrayOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});
export default connect(mapStateToProps)(WalletForm);
