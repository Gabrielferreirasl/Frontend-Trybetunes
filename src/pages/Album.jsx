import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';

export class Album extends Component {
  constructor() {
    super();
    this.state = { loading: true, tracks: [] };
    this.renderCardMusic = this.renderCardMusic.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((obj) => this.setState({ loading: false, tracks: obj }));
  }

  renderCardMusic() {
    const { tracks } = this.state;
    return (
      <div data-testid="page-album">
        <h3 data-testid="album-name">{tracks[0].collectionName}</h3>
        <h4 data-testid="artist-name">{tracks[0].artistName}</h4>
        <div>
          { tracks.map((music) => (
            music.kind === 'song' && <MusicCard
              key={ music.trackId }
              track={ music }
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
