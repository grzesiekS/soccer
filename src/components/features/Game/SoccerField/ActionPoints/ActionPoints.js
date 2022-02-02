import React from 'react';
import PropTypes from 'prop-types';

import styles from './ActionPoints.module.scss';

const ActionPoints = ({ columns }) => (
  <div className={styles.container}>
    {columns.map(column => (
      <div key={column} id={column} className={styles.point}></div>
    ))}
  </div>
);

ActionPoints.propTypes = {
  columns: PropTypes.array,
};

export default ActionPoints;
