import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { getUser, updateUser } from '../services/userAPI';
import { Loading } from '../components/Loading';
import userDefault from '../images/userDefault.png';

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
        className="flex justify-center mt-20 mb-20"
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
        <div className="italic font-sans rounded shadow-lg w-1/4 p-10 space-y-7">
          <div className="italic font-sans flex justify-around">
            <img
              className="rounded-full h-32 w-32"
              src={ image === '' ? userDefault : image }
              alt="user"
            />
            <div className="flex items-center">
              <input
                value={ image }
                placeholder="Link"
                onChange={ this.handleInput }
                type="text"
                name="image"
                className="shadow appearance-none border rounded w-full py-2 px-3
              text-gray-700 leading-tight focus:outline-none focus:shadow-outline
              font-bold font-sans italic"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-1">Nome</h3>
            <input
              value={ name }
              onChange={ this.handleInput }
              type="text"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            font-bold font-sans italic"
            />
          </div>
          <div>
            <h3 className="font-bold mb-1">E-mail</h3>
            <input
              value={ email }
              onChange={ this.handleInput }
              type="text"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            font-bold font-sans italic"
            />
          </div>
          <div>
            <h3 className="font-bold mb-1">Descrição</h3>
            <textarea
              value={ description }
              onChange={ this.handleInput }
              name="description"
              cols="30"
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            font-bold font-sans italic"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-transparent hover:bg-blue-500
              text-blue-700 font-semibold
                 hover:text-white py-2 px-4 border border-blue-500
                 hover:border-transparent rounded"
              disabled={
                name.length === 0 || description.length === 0
              || image.length === 0 || !this.validateEmail(email)
              }
            >
              Salvar
            </button>
          </div>
        </div>
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
