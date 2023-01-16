import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    console.log(total);
    const valorTotal = total;
    return (
      <header>
        <div>Header</div>
        <p
          data-testid="email-field"
        >
          { email }
        </p>
        <span data-testid="total-field">
          { (+valorTotal).toFixed(2) }
        </span>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state.user,
    ...state.wallet,
  };
};

export default connect(mapStateToProps)(Header);
