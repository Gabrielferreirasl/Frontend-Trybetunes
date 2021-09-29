import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Profile extends Component {
  constructor() {
    super();
    this.state = { loading: true, user: {} };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.setUser();
  }

  setUser() {
    getUser().then((user) => this.setState({ loading: false, user }));
  }

  renderUserInfo() {
    const { user: { name, description, email, image } } = this.state;
    return (
      <main>
        <div>
          <img
            data-testid="profile-image"
            src={ image }
            alt="user"
          />
          <Link
            to="/profile/edit"
          >
            <button
              type="button"
            >
              Editar perfil
            </button>
          </Link>
        </div>
        <div>
          <h3>Nome</h3>
          <p>{name}</p>
          <h3>E-mail</h3>
          <p>{email}</p>
          <h3>Descrição</h3>
          <p>{description}</p>
        </div>
      </main>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : this.renderUserInfo()}
      </div>
    );
  }
}

export default Profile;
