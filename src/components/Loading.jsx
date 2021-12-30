import React, { Component } from 'react';

export class Loading extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <h1 className="text-black mt-5 text-4xl font-sans italic">Loading...</h1>
      </div>
    );
  }
}

export default Loading;
