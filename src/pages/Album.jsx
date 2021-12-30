import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { Loading } from '../components/Loading';
import { MusicCard } from '../components/MusicCard';
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
    return (
      <div className="p-4 ml-64 mr-64">
        <div className="ml-20 font-bold italic font-sans space-y-3 mt-10 mb-10">
          <h3>{tracks[0].collectionName}</h3>
          <h4>{tracks[0].artistName}</h4>
        </div>
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
