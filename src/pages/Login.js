import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPersonal } from '../redux/actions';

const MAX_PASSWORD_SIZE = 6;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  btnDisabled = () => {
    const { email, password } = this.state;
    return password.length < MAX_PASSWORD_SIZE
    || !email.match(/\S+@\S+\.\S+/);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(addPersonal(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <div>
          <h2>
            Login
          </h2>
          <label htmlFor="email">
            E-mail:
            <input
              label="Email:"
              type="text"
              onChange={ this.handleChange }
              name="email"
              value={ email }
              data-testid="email-input"
              id="email"
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              label="password:"
              type="password"
              onChange={ this.handleChange }
              name="password"
              value={ password }
              data-testid="password-input"
              id="password"
            />
          </label>

          <button
            disabled={ this.btnDisabled() }
            type="submit"
            label="Entrar"
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);
