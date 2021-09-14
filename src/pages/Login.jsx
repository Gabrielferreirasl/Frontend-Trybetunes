import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export class Login extends Component {
  constructor() {
    super();
    this.state = { user: '', btnDisabled: true, loading: false, login: true };
    this.renderLogin = this.renderLogin.bind(this);
    this.minimumCharacters = this.minimumCharacters.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  handleLoading() {
    const { loading } = this.state;
    return (loading ? <Loading /> : <Redirect to="/search" />);
  }

  submitUser(event) {
    event.preventDefault();
    this.setState({ loading: true, login: false });
    const { user } = this.state;
    createUser({ name: user })
      .then(() => this.setState({ loading: false }));
  }

  minimumCharacters(event) {
    const minumumLength = 3;
    const { value } = event.target;
    this.setState({ user: value, btnDisabled: value.length < minumumLength });
  }

  renderLogin() {
    const { btnDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form action="get">
          <input
            type="text"
            name="user"
            id="usuario-login"
            data-testid="login-name-input"
            onChange={ this.minimumCharacters }
          />
          <button
            type="submit"
            disabled={ btnDisabled }
            data-testid="login-submit-button"
            onClick={ this.submitUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { login } = this.state;
    return (
      login ? this.renderLogin() : this.handleLoading()
    );
  }
}

export default Login;
