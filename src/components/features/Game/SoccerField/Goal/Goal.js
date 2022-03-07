import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Goal.module.scss';

const Goal = ({player, reversed = false }) => {
  return (
    <div className={reversed
      ? clsx(styles.container, styles.reversed)
      : clsx(styles.container, styles.normal)}
    >
      <p className={styles.playerName}>{player}</p>
    </div>
  );
};

Goal.propTypes = {
  reversed: PropTypes.bool,
  player: PropTypes.string,
};

export default Goal;
