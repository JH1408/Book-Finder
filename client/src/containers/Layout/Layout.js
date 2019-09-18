import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import BookList from '../../components/BookList/BookList';
import SavedBooks from '../../components/BookList/SavedBooks';
import Login from '../../components/Login/Login';
import * as actions from '../../store/actions/index';

const Homepage = (props) => {
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

  useEffect(() => {
    if(isAuth) {
      setVisible(false)
    }
  }, [isAuth]);

  let component = <BookList unauthenticated={openModalHandler}/>
  if (props.history.location.pathname === '/books') {
    component = <SavedBooks unauthenticated={openModalHandler} />
  }

  return (
    <React.Fragment>
      <Login visible={visible} hide={closeModalHandler}/>
      <Header clicked={openModalHandler}/>
      <Search/>
      {component}
    </React.Fragment>
  )
}

export default withRouter(Homepage);
