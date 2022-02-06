import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Goal.module.scss';

const Goal = ({ reversed = false }) => {
  return (
    <div className={reversed
      ? clsx(styles.container, styles.reversed)
      : clsx(styles.container, styles.normal)}
    >
      <div className={styles.goal}></div>
    </div>
  );
};

Goal.propTypes = {
  reversed: PropTypes.bool,
};

export default Goal;
