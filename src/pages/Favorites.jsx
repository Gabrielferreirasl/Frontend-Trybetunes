import React, { Component } from 'react';
import { Loading } from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { MusicCard } from '../components/MusicCard';

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
      <main
        className="mt-10 mb-10 mr-64 ml-64 font-bold text-lg font-sans
      italic "
      >
        {loading ? <Loading /> : (
          <>
            <p className="mb-10 ml-10">Favorite songs:</p>
            {favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                onChange={ this.removeFavorite }
                check
                track={ song }
              />))}
          </>
        )}
      </main>
    );
  }
}

export default Favorites;
