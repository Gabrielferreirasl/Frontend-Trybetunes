import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from '../components/Loading';
import userDefault from '../images/userDefault.png';

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
      <div className="flex justify-center mt-20">
        <div className="italic font-sans rounded shadow-lg w-1/4">
          <div className="flex justify-around">
            <img
              className="rounded-full h-32 w-32"
              src={ image === '' ? userDefault : image }
              alt="user"
            />
            <div className="flex items-center">
              <Link
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
                 hover:text-white py-2 px-4 border border-blue-500
                 hover:border-transparent rounded"
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </div>
          </div>
          <div className="p-5 ml-10 space-y-9">
            <div>
              <h2 className="font-bold mb-1">Name</h2>
              <p className="text-gray-700 text-base">{name}</p>
            </div>
            <div>
              <h2 className="font-bold mb-1">E-mail</h2>
              <p className="text-gray-700 text-base">{email === '' ? '""' : email}</p>
            </div>
            <div>
              <h2 className="font-bold mb-1">Description</h2>
              <p className="text-sm break-all flex-wrap text-gray-700 text-base">
                {description === '' ? '""' : description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <main>
        {loading ? <Loading /> : this.renderUserInfo()}
      </main>
    );
  }
}

export default Profile;
