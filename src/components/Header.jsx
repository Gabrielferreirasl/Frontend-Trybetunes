import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from '../pages/Loading';

export class Header extends Component {
  constructor() {
    super();
    this.state = { loading: true, userFromGetUser: '' };
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    getUser()
      .then((user) => this.setState({ loading: false, userFromGetUser: user }));
  }

  renderHeader() {
    const { userFromGetUser } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <h3 data-testid="header-user-name">{ userFromGetUser.name }</h3>
        </div>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

      </header>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <Loading /> : this.renderHeader()
    );
  }
}

export default Header;
