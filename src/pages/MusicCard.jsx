import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MusicCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { track, onChange } = this.props;
    onChange(event, track);
  }

  renderTracks() {
    const { track, check } = this.props;
    return (
      <div>
        <p>{ track.trackName }</p>
        <audio data-testid="audio-component" src={ track.previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label
          htmlFor={ track.trackId }
          data-testid={ `checkbox-music-${track.trackId}` }
        >
          Favorita
          <input
            checked={ check }
            type="checkbox"
            value={ track }
            id={ track.trackId }
            onChange={ this.handleChange }
          />
        </label>
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
