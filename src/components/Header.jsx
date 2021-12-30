import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';
import iconMusic from '../images/iconMusic.png';

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
      <header className="w-full">
        <div className="w-full flex justify-between bg-gray-900">
          <div className="ml-10 p-5">
            <img src={ iconMusic } alt="musicAnimation" className="" />
          </div>
          <div className="flex items-center mr-10">
            <h3
              className="text-white font-bold font-sans italic "
            >
              { userFromGetUser.name }
            </h3>
          </div>
        </div>
        <div
          className="w-full flex justify-evenly pr-7 pl-7 pt-2
          pb-2 bg-violet-700 shadow shadow-2xl"
        >
          <Link
            className="text-white font-bold font-sans italic"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            className="text-white font-bold font-sans italic"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link
            className="text-white font-bold font-sans italic"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
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
