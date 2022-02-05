import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import styles from './Player.module.scss';

import {GameContext} from '../../../../ContextAPI/GameContext';
import clsx from 'clsx';

const Player = ({ name }) => {
  const {playerTurnContext} = useContext(GameContext);

  const [playerTurn] = playerTurnContext;

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
