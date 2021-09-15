import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export class MusicCard extends Component {
  constructor() {
    super();
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  handleFavorites(event) {
    const { name } = event.target;
    const { renderLoading } = this.props;
    if (event.checked) {
      removeSong(name);
    }
    if (!event.checked) {
      renderLoading();
      addSong(name).then(() => {
        renderLoading();
      });
    }
    const { saveIds } = this.props;
    saveIds(name);
  }

  renderTracks() {
    const { track, check } = this.props;
    return (
      <div>
        <p>{ track.trackName }</p>
        <audio data-testid="audio-component" src={ track.previewUrl } controls>
          <track kind="captions" />
        </audio>
        <input
          checked={ check }
          data-testid={ `checkbox-music-${track.trackId}` }
          type="checkbox"
          name={ track.trackId }
          id="fav"
          onChange={ this.handleFavorites }
        />
      </div>
    );
  }

  render() {
    return (
      this.renderTracks()
    );
  }
}

MusicCard.propTypes = PropTypes.objectOf({
  track: PropTypes.object,
}).isRequired;

export default MusicCard;
