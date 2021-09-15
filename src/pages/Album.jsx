import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';

export class Album extends Component {
  constructor() {
    super();
    this.state = { loading: true, tracks: [], favorites: [] };
    this.renderCardMusic = this.renderCardMusic.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.saveIds = this.saveIds.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((obj) => this.setState({ loading: false, tracks: obj }));
  }

  saveIds(idToBeSaved) {
    const { favorites } = this.state;
    if (!favorites.some((id) => id === idToBeSaved)) {
      return this.setState({ favorites: [...favorites, idToBeSaved] });
    }
    return this.setState({ favorites: favorites.filter((id) => id !== idToBeSaved) });
  }

  renderCardMusic() {
    const { tracks, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <h3 data-testid="album-name">{tracks[0].collectionName}</h3>
        <h4 data-testid="artist-name">{tracks[0].artistName}</h4>
        <div>
          { tracks.map((music) => (
            music.kind === 'song'
              && <MusicCard
                saveIds={ this.saveIds }
                check={ favorites.some((id) => parseInt(id, 10) === music.trackId) }
                key={ music.trackId }
                renderLoading={ this.renderLoading }
                track={ music }
              />))}
        </div>
      </div>
    );
  }

  renderLoading() {
    const { loading } = this.state;
    if (loading === true) return this.setState({ loading: false });
    return this.setState({ loading: true });
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
