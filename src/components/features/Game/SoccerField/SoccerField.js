import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import LineTo from 'react-lineto';

import styles from './SoccerField.module.scss';
import ActionPoints from './ActionPoints/ActionPoints';

import {GameContext} from '../../../../ContextAPI/GameContext';

const SoccerField = () => {

  const {soccerFieldSizeContext, gameMovesContext} = useContext(GameContext);

  const [soccerFieldSize] = soccerFieldSizeContext;
  const [gameMoves] = gameMovesContext;

  const pointsCreatorHelper = () => {
    const points = [];

    for(let i = 0; i < soccerFieldSize[1]; i++) {
      const columns = [];
      for(let j = 0; j < soccerFieldSize[0]; j++) {
        columns.push([i, j]);
      }
      points.push({row: i, columns: columns});
    }

    return points;
  };

  return (
    <div className={styles.container}>
      {pointsCreatorHelper().map(point => (
        <ActionPoints key={point.row} columns={point.columns} />
      ))}
      {gameMoves.map(move => (
        <LineTo key={move} from={`${move[0]}`} to={`${move[1]}`} borderWidth={3} />
      ))}
    </div>
  );
};

SoccerField.propTypes = {
  fieldSize: PropTypes.array,
};

export default SoccerField;
