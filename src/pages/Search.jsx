import React, { Component } from 'react';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import { CreateCards } from '../components/CreateCards';
import { Loading } from '../components/Loading';

export class Search extends Component {
  constructor() {
    super();
    this.state = { searchValue: '', btnDisabled: true, loading: false, infoApi: false };
    this.handleInput = this.handleInput.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInput(event) {
    const minumumLength = 2;
    const { value } = event.target;
    this.setState({ searchValue: value, btnDisabled: value.length < minumumLength });
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { searchValue } = this.state;
    searchAlbumsAPIs(searchValue)
      .then((result) => {
        this.setState({ loading: false, infoApi: this.renderInfo(result) });
      });
  }

  searchAlbum() {
    const { btnDisabled, infoApi } = this.state;
    return (
      <main>
        <div className="flex justify-center mt-10 mb-10">
          <form className="flex">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a album or artist"
              className="shadow appearance-none border rounded w-full py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            font-bold font-sans italic"
              onChange={ this.handleInput }
            />
            <button
              type="submit"
              disabled={ btnDisabled }
              onClick={ this.handleSearch }
              className="ml-5 shadow bg-teal-500 hover:bg-teal-700 focus:shadow-outline
             focus:outline-none text-white font-bold py-2 px-4 rounded font-sans italic"
            >
              Pesquisar
            </button>
          </form>
        </div>
        {infoApi}
      </main>
    );
  }

  renderInfo(info) {
    const { searchValue } = this.state;
    const string = `Resultado de álbuns de: ${searchValue}`;
    return (
      info.length >= 1 ? (
        <div className="flex-col ml-5 mr-3 mb-20">
          <p className="text-center font-bold font-sans italic mb-10">{string}</p>
          <div className="flex justify-center flex-wrap">
            { info.map((Album) => (
              <CreateCards key={ Album.collectionId } album={ Album } />)) }
          </div>
        </div>)
        : (
          <p
            className="text-center
        font-bold font-sans italic text-red-500"
          >
            Nenhum álbum foi encontrado
          </p>
        )
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <Loading />
        : this.searchAlbum()
    );
  }
}

export default Search;
