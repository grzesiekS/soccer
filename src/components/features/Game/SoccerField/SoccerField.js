import React from 'react';
import PropTypes from 'prop-types';

import styles from './SoccerField.module.scss';
import ActionPoints from './ActionPoints/ActionPoints';

const SoccerField = ({ fieldSize }) => {
  const pointsCreatorHelper = fieldSize => {
    const points = [];

    for(let i = 0; i < fieldSize[1]; i++) {
      const columns = [];
      for(let j = 0; j < fieldSize[0]; j++) {
        columns.push([i, j]);
      }
      points.push({row: i, columns: columns});
    }

    console.log(points);

    return points;
  };

  return (
    <div className={styles.container}>
      {pointsCreatorHelper(fieldSize).map(point => (
        <ActionPoints key={point.row} columns={point.columns} />
      ))}
    </div>
  );
};

SoccerField.propTypes = {
  fieldSize: PropTypes.array,
};

export default SoccerField;
