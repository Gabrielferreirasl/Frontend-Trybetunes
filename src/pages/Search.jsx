import React, { Component } from 'react';

export class Search extends Component {
  constructor() {
    super();
    this.state = { btnDisabled: true };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    const minumumLength = 2;
    const { value } = event.target;
    this.setState({ btnDisabled: value.length < minumumLength });
  }

  render() {
    const { btnDisabled } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
