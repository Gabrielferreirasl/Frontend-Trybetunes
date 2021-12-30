import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class CreateCards extends Component {
  render() {
    const { album } = this.props;
    const { collectionName, artistName, artworkUrl100, collectionId } = album;
    return (
      <section
        className="w-72 h-72 rounded overflow-hidden
      shadow-2xl flex justify-center mb-7 mr-7"
      >
        <Link
          to={ `/album/${collectionId}` }
        >
          <img
            className="w-72 h-40"
            src={ artworkUrl100 }
            alt={ `album ${collectionName}` }
          />
          <div className="p-3">
            <h3 className="font-bold text-lg mb-2 font-sans italic">
              { collectionName }
            </h3>
            <h4 className="text-gray-700 text-base font-sans italic">{ artistName }</h4>
          </div>
        </Link>
      </section>
    );
  }
}

CreateCards.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default CreateCards;
