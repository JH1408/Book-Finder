import React from 'react';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import BookList from '../../components/BookList/BookList';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header/>
      <Search/>
      <BookList/>
    </React.Fragment>
  )
}

export default Layout;
