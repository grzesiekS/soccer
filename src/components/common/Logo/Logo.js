import React from 'react';
import PropTypes from 'prop-types';

import styles from './Logo.module.scss';

const Logo = ({ title }) => (
  <h1 className={styles.logo}>
    {title}
  </h1>
);

Logo.propTypes = {
  title: PropTypes.string,
};

export default Logo;
