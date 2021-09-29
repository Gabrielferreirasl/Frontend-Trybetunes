import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import { Loading } from './Loading';

export class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = { isloading: true, redirectToProfile: false, user: {} };
    this.renderForm = this.renderForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.resolveGetUser = this.resolveGetUser.bind(this);
  }

  componentDidMount() {
    this.resolveGetUser();
  }

  handleInput({ target: { name, value } }) {
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  }

  validateEmail(email) {
    const structure = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return structure.test(String(email).toLowerCase());
  }

  resolveGetUser() {
    getUser().then((user) => this.setState({ isloading: false, user }));
  }

  renderForm() {
    const { user: { name, description, email, image } } = this.state;
    return (
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          this.setState({ isloading: true });
          updateUser({
            name,
            email,
            image,
            description,
          });
          this.setState({ redirectToProfile: true });
        } }
      >
        <div>
          <img src={ image } alt="user" />
          <input
            value={ image }
            data-testid="edit-input-image"
            onChange={ this.handleInput }
            type="text"
            name="image"
          />
        </div>
        <h3>Nome</h3>
        <input
          value={ name }
          onChange={ this.handleInput }
          data-testid="edit-input-name"
          type="text"
          name="name"
        />
        <h3>E-mail</h3>
        <input
          value={ email }
          onChange={ this.handleInput }
          data-testid="edit-input-email"
          type="text"
          name="email"
        />
        <h3>Descrição</h3>
        <textarea
          value={ description }
          onChange={ this.handleInput }
          data-testid="edit-input-description"
          name="description"
          cols="30"
          rows="10"
        />
        <button
          type="submit"
          disabled={
            name.length === 0 || description.length === 0
              || image.length === 0 || !this.validateEmail(email)
          }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </form>
    );
  }

  render() {
    const { isloading, redirectToProfile } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {isloading ? <Loading /> : this.renderForm()}
        {redirectToProfile && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
