import React from 'react'
import './hitsTracker.scss';
export const HitsTracker = ({ hits }) => {
    return (
      <div className="hits-tracker">
        <span>HITS: {hits}</span>
      </div>
    );
  };
