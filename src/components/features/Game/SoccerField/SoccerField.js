import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import LineTo from 'react-lineto';

import {getSoccerFieldSize} from '../../../../redux/fieldSizeAndBallPositionRedux';
import {getPlayerOne, getPlayerTwo} from '../../../../redux/playersRedux';

import styles from './SoccerField.module.scss';
import ActionPoints from './ActionPoints/ActionPoints';
import Goal from './Goal/Goal';

const SoccerField = () => {

  const soccerFieldSize = useSelector(getSoccerFieldSize);
  const playerOne = useSelector(getPlayerOne);
  const playerTwo = useSelector(getPlayerTwo);

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

  const [actionPoints] = useState(pointsCreatorHelper());

  return (
    <div className={styles.container}>
      <Goal player={playerTwo.Name} />
      {actionPoints.map(point => (
        <ActionPoints key={point.row} columns={point.columns} maxRow={actionPoints.length - 1}/>
      ))}
      <Goal reversed={true} player={playerOne.Name} />
      {playerOne.Moves.map(move => (
        <LineTo key={move} from={`${move[0]}`} to={`${move[1]}`} borderWidth={3} borderColor={'#ff5252'} />
      ))}
      {playerTwo.Moves.map(move => (
        <LineTo key={move} from={`${move[0]}`} to={`${move[1]}`} borderWidth={3} borderColor={'#2980b9'} />
      ))}
    </div>
  );
};

SoccerField.propTypes = {
  fieldSize: PropTypes.array,
};

export default SoccerField;
