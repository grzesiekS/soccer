import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({description, onClickFunction}) => (
  <button className={styles.button} onClick={e => onClickFunction(e)}>
    <p className={styles.description}>{description}</p>
  </button>
);

Button.propTypes = {
  description: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default Button;
