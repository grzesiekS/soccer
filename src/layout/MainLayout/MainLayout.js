import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
