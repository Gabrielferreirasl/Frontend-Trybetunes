import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class CreateCards extends Component {
  render() {
    const { album } = this.props;
    const { collectionName, artistName, artworkUrl100, collectionId } = album;
    return (
      <section>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ `album ${collectionName}` } />
          <div>
            <h3>{ collectionName }</h3>
            <h4>{ artistName }</h4>
          </div>
        </Link>
      </section>
    );
  }
}

CreateCards.propTypes = {
  album: PropTypes.objectOf({
    collectionId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default CreateCards;
