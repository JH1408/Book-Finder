import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';
import BookList from '../../components/BookList/BookList';
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
    setVisible(false)
  }

  useEffect(() => {
    if(isAuth) {
      setVisible(false)
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      <Login visible={visible} hide={closeModalHandler}/>
      <Header clicked={openModalHandler}/>
      <Search/>
      <BookList unauthenticated={openModalHandler}/>
    </React.Fragment>
  )
}

export default Homepage;
