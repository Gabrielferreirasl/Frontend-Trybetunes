import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MusicCard extends Component {
  render() {
    const { track } = this.props;
    return (
      <div>
        <p>{ track.trackName }</p>
        <audio data-testid="audio-component" src={ track.previewUrl } controls>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = PropTypes.objectOf({
  track: PropTypes.object,
}).isRequired;

export default MusicCard;
