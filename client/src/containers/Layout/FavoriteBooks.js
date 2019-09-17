import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import SavedBooks from '../../components/BookList/SavedBooks';
import Login from '../../components/Login/Login';
import * as actions from '../../store/actions/index';

const Layout = (props) => {
  const [visible, setVisible] = useState(false);
  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });
  const dispatch = useDispatch();
  const openModalHandler = () => {
    if(isAuth) {
      dispatch(actions.logout())
      props.history.push('/');
    } else {
      setVisible(true)
    }
  }
  const closeModalHandler = () => {
    setVisible(false);
    props.history.replace('/')
  }

  return (
    <React.Fragment>
      <Login visible={visible} hide={closeModalHandler}/>
      <Header clicked={openModalHandler}/>
      <SavedBooks unauthenticated={openModalHandler} />
    </React.Fragment>
  )
}

export default Layout;
