import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrencies());
  }

  coins = () => {
    const { currencies } = this.props;
    const optionsMap = currencies.map((coins) => (
      <option key={ coins } value={ coins }>
        {coins}
      </option>));
    return optionsMap;
  };

  render() {
    return (
      <form className="walletForm">
        <div>
          <label htmlFor="expense">
            Valor
            <input
              type="number"
              name="expense"
              id="expense"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="coin">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="coin"
            >
              {this.coins()}
            </select>
          </label>

          <label htmlFor="method">
            Método de Pagamento
            <select
              id="method"
              data-testid="method-input"
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Débito">Cartão de débito</option>
              <option value="Cartão de Crédito">Cartão de crédito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria
            <select
              id="category"
              data-testid="tag-input"
              name="category"
            >
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>

        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
