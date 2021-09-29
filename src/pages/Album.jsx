import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export class Album extends Component {
  constructor() {
    super();
    this.state = { loading: true, tracks: [], favorites: [] };
    this.handleFavorites = this.handleFavorites.bind(this);
    this.renderCardMusic = this.renderCardMusic.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((obj) => this.setState({ loading: false, tracks: obj }));
    getFavoriteSongs().then((songs) => this.setState({ favorites: songs }));
  }

  handleFavorites({ target }, track) {
    this.setState({ loading: true });
    const update = target.checked ? addSong : removeSong;
    update(track).then(() => this.setState({ loading: false }));
    return getFavoriteSongs().then((songs) => this.setState({ favorites: songs }));
  }

  renderCardMusic() {
    const { tracks, favorites } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-album">
        <h3 data-testid="album-name">{tracks[0].collectionName}</h3>
        <h4 data-testid="artist-name">{tracks[0].artistName}</h4>
        <div>
          { tracks.slice(1).map((music) => (
            <MusicCard
              check={ favorites.some((track) => track.trackId === music.trackId) }
              key={ music.trackId }
              track={ music }
              onChange={ this.handleFavorites }
            />))}
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <Loading /> : this.renderCardMusic()
    );
  }
}

Album.propTypes = PropTypes.shape({
  match: { params: { id: PropTypes.string } },
}).isRequired;

export default Album;
