import React from 'react';
import PropTypes from 'prop-types';

import styles from './Player.module.scss';

const Player = ({ name }) => (
  <div className={styles.container}>
    <h2 className={styles.name}>{name}</h2>
  </div>
);

Player.propTypes = {
  name: PropTypes.string,
};

export default Player;
