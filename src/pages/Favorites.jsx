import React, { Component } from 'react';
import { Loading } from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { MusicCard } from './MusicCard';

export class Favorites extends Component {
  constructor() {
    super();
    this.state = { loading: true, favoriteSongs: [] };
    this.setFavoriteSongs = this.setFavoriteSongs.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.setFavoriteSongs();
  }

  setFavoriteSongs() {
    getFavoriteSongs()
      .then((songs) => this.setState({ loading: false, favoriteSongs: songs }));
  }

  removeFavorite(event, track) {
    this.setState({ loading: true });
    removeSong(track).then(() => this.setFavoriteSongs());
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading ? <Loading /> : favoriteSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            onChange={ this.removeFavorite }
            check
            track={ song }
          />))}
      </div>
    );
  }
}

export default Favorites;
