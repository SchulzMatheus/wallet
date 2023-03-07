import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPersonal } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    validButton: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validationButton());
  };

  validationButton = () => {
    const { email, password } = this.state;
    const lenghtPassword = 6;
    const validationEmail = email.includes('@') && email.includes('.com');
    this.setState({
      validButton: password.length >= lenghtPassword && validationEmail,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    // console.log(dispatch);
    dispatch(addPersonal(this.state));
    history.push('/carteira');
  };

  render() {
    const { email, password, validButton } = this.state;
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
              placeholder="Digite seu email"
              // required
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
              placeholder="Digite sua senha"
            />
          </label>

          <button
            disabled={ !validButton }
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
