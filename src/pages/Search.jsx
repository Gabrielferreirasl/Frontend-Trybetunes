import React, { Component } from 'react';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import { CreateCards } from './CreateCards';
import { Loading } from './Loading';

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
      <div data-testid="page-search">
        <form action="get">
          <input
            type="text"
            name="search"
            id="search"
            data-testid="search-artist-input"
            onChange={ this.handleInput }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisabled }
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </form>
        {infoApi}
      </div>
    );
  }

  renderInfo(info) {
    const { searchValue } = this.state;
    const string = `Resultado de álbuns de: ${searchValue}`;
    return (
      info.length >= 1 ? (
        <div>
          <p>{string}</p>
          { info.map((Album) => <CreateCards key={ Album.id } album={ Album } />) }
        </div>)
        : <p>Nenhum álbum foi encontrado</p>
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
