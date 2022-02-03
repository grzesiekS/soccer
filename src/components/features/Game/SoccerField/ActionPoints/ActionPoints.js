import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ActionPoints.module.scss';

import {GameContext} from '../../../../../ContextAPI/GameContext';

const ActionPoints = ({ columns }) => {
  const {ballPositionContext} = useContext(GameContext);

  const [ballPosition] = ballPositionContext;

  const determineBallPosition = (actionPoint) => {
    if(ballPosition[0] === actionPoint[0]
      && ballPosition[1] === actionPoint[1]) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.container}>
      {columns.map(column => (
        <div
          key={column}
          id={column}
          className={determineBallPosition(column)
            ? clsx(styles.point, styles.ball)
            : styles.point}
        />
      ))}
    </div>
  );
};

ActionPoints.propTypes = {
  columns: PropTypes.array,
};

export default ActionPoints;
