import React from 'react';
import Logo from '../../components/common/Logo/Logo';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.container}>
    <Logo title='Soccer' />
  </div>
);

export default Header;
