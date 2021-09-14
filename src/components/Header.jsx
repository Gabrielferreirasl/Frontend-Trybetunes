import React, { Component } from 'react';
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
        <h3 data-testid="header-user-name">{ userFromGetUser.name }</h3>
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
