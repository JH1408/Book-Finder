import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import SavedBooks from '../../components/BookList/SavedBooks';
import Login from '../../components/Login/Login'

const Layout = (props) => {
  const [visible, setVisible] = useState(false);

  const openModalHandler = () => {
    setVisible(true)
  }
  const closeModalHandler = () => {
    setVisible(false)
  }

  return (
    <React.Fragment>
      <Login visible={visible} hide={closeModalHandler}/>
      <Header clicked={openModalHandler}/>
      <SavedBooks />
    </React.Fragment>
  )
}

export default Layout;
