import React from 'react';
import PropTypes from 'prop-types';

import styles from './Score.module.scss';

const Score = ({ playerOneScore, playerTwoScore }) => (
  <div className={styles.container}>
    <h2 className={styles.score}>{`${playerOneScore} - ${playerTwoScore}`}</h2>
  </div>
);

Score.propTypes = {
  playerOneScore: PropTypes.number,
  playerTwoScore: PropTypes.number,
};

export default Score;
