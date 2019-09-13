import React from 'react';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Search/>
    </React.Fragment>
  )
}

export default Layout;
