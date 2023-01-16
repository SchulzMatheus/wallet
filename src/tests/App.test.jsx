import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import App from '../App';

describe('testando redenrização da página de login', () => {
  it('verifica a renderizacao da tela de login', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: /login/i,
    });
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('Login');
    const inputPlaceholderSenha = screen.getByPlaceholderText(/digite sua senha/i);
    expect(inputPlaceholderSenha.type).toBe('password');
    expect(inputPlaceholderSenha).toBeInTheDocument();
    const emailLabel = screen.getByLabelText(/e-mail/i);
    expect(emailLabel).toBeInTheDocument();
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.innerHTML).toBe('Entrar');
    const passwordLabel = screen.getByLabelText(/senha/i);
    expect(passwordLabel).toBeInTheDocument();
    const inputpassword = screen.getByTestId('password-input');
    expect(inputpassword).toBeInTheDocument();
    const inputPlaceholderEmail = screen.getByPlaceholderText(/digite seu email/i);
    expect(inputPlaceholderEmail.type).toBe('text');
    expect(inputPlaceholderEmail).toBeInTheDocument();
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });
  it('verifica se o redirecionamento está correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputpassword = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn.disabled).toBe(true);
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputpassword, '123456');
    userEvent.click(loginBtn);
    expect(loginBtn.disabled).toBe(false);
    expect(history.location.pathname).toBe('/carteira');
  });
});
describe('testando renderização da wallet', () => {
  it('verifica se a tela de Wallet é renderizada corretamente', async () => {
    renderWithRedux(<Wallet />);
    const description = screen.getByLabelText(/descrição/i);
    expect(description).toBeInTheDocument();
    const value = screen.getByLabelText(/valor/i);
    expect(value).toBeInTheDocument();
    const currency = screen.getByLabelText(/moeda/i);
    expect(currency).toBeInTheDocument();
    const tag = screen.getByLabelText(/tag/i);
    expect(tag).toBeInTheDocument();
    const method = screen.getByLabelText(/método de pagamento/i);
    expect(method).toBeInTheDocument();
    const tableDescription = screen.getByRole('columnheader', { name: /descrição/i });
    expect(tableDescription).toBeInTheDocument();
    expect(tableMethod).toBeInTheDocument();
    expect(tableExchange).toBeInTheDocument();
    expect(tableValueConvert).toBeInTheDocument();
    expect(tableMoedaConvertion).toBeInTheDocument();
    expect(tableChange).toBeInTheDocument();
  });
  it('Verifica a geração da tabela', async () => {
    renderWithRedux(<Wallet />);
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByTestId('button-add');
    userEvent.type(value, '100');
    userEvent.type(description, 'Restaurante');
    userEvent.type(currency, 'USD');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');
    userEvent.click(button);
    const table = screen.getByTestId('table');
    expect(table).toBeInTheDocument();
    const valueDescricao = await screen.findByRole('cell', { name: /restaurante/i });
    const valueTag = await screen.findByRole('cell', { name: /alimentação/i });
    const valueMetodo = await screen.findByRole('cell', { name: /dinheiro/i });
    const valueMoeda = await screen.findByRole('cell', { name: '5.31' });
    const valueValue = await screen.findByRole('cell', { name: /100\.00/i });
    const convertedValue = await screen.findByRole('cell', { name: /531\.36/i });
    expect(valueDescricao).toBeInTheDocument();
    expect(valueTag).toBeInTheDocument();
    expect(valueMetodo).toBeInTheDocument();
    expect(valueValue).toBeInTheDocument();
    expect(valueMoeda).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
  });
});
