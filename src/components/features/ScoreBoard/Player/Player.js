import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {getPlayerTurn} from '../../../../redux/playersRedux';

import styles from './Player.module.scss';

import clsx from 'clsx';

const Player = ({ name }) => {
  const playerTurn = useSelector(getPlayerTurn);

  return (
    <div className={styles.container}>
      <h2 className={playerTurn === name ? clsx(styles.name, styles.active) : styles.name}>{name}</h2>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string,
};

export default Player;
