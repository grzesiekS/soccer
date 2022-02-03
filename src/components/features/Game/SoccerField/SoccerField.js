import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import styles from './SoccerField.module.scss';
import ActionPoints from './ActionPoints/ActionPoints';

import {GameContext} from '../../../../ContextAPI/GameContext';

const SoccerField = () => {

  const {soccerFieldSizeContext} = useContext(GameContext);

  const [soccerFieldSize] = soccerFieldSizeContext;

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
    </div>
  );
};

SoccerField.propTypes = {
  fieldSize: PropTypes.array,
};

export default SoccerField;
