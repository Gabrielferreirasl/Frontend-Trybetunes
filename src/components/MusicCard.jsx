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
      <div className="border-b border-t flex mr-20 ml-20 items-center">
        <img
          className="rounded-full w-20 h-20 ml-20
         mr-20"
          src={ track.artworkUrl100 }
          alt="artwork"
        />
        <div
          className="p-5 flex space-x-5 w-full"
        >
          <div className="flex mr-24 w-72 items-center">
            <p className="text-gray-500">{ track.trackName }</p>
          </div>
          <div className="flex space-x-7 items-center">
            <audio src={ track.previewUrl } controls>
              <track kind="captions" />
            </audio>
            <input
              checked={ check }
              type="checkbox"
              value={ track }
              id={ track.trackId }
              onChange={ this.handleChange }
            />
          </div>
        </div>
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
