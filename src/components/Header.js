import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    total: 0,
    currency: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { total, currency } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <span data-testid="total-field">
          { total }
        </span>
        <span data-testid="header-currency-field">
          { currency }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
