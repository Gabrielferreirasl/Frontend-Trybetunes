import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';
import musicLogin from '../images/musicLogin.gif';

export class Login extends Component {
  constructor() {
    super();
    this.state = { user: '', btnDisabled: true, loading: false, loginActivated: true };
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
    this.setState({ loading: true, loginActivated: false });
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
      <main className="flex justify-center mt-20">
        <div className="w-full max-w-2xl flex-col">
          <img src={ musicLogin } alt="musicAnimation" />
          <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Login
              </label>
              <input
                type="text"
                name="user"
                className="shadow appearance-none border rounded w-full
                py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="username"
                placeholder="Username"
                onChange={ this.minimumCharacters }
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={ btnDisabled }
                className="bg-blue-500 hover:bg-blue-700 text-white w-full
                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={ this.submitUser }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  render() {
    const { loginActivated } = this.state;
    return (
      loginActivated ? this.renderLogin() : this.handleLoading()
    );
  }
}

export default Login;
