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
  const [inputValue, setInputValue] = useState('');
  const [maxResults] = useState(10);
  const [startIndex, setStartIndex] = useState(11);
  const [menu, setMenu] = useState(false)

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  const dispatch = useDispatch();

  const openModalHandler = () => {
    if(isAuth) {
      dispatch(actions.logout());
      props.history.push('/');
    } else {
      setVisible(true);
      setMenu(false);
    }
  }

  const closeModalHandler = () => {
    setVisible(false);
    props.history.replace('/');
    dispatch(actions.resetError());
  }

  const searchBooks = (input) => {
    setInputValue(input);
    dispatch(actions.searchBooks(input));
  }

  const fetchBooks = () => {
    setStartIndex(startIndex + maxResults);
    dispatch(actions.loadMoreBooks(inputValue, startIndex));
  }

  useEffect(() => {
    if(isAuth) {
      setVisible(false);
    }
  }, [isAuth]);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  }

  const closeBackdropHandler = () => {
    setMenu(false);
  }

  let component = (
      <React.Fragment>
        <Search search={searchBooks}/>
        <BookList unauthenticated={openModalHandler} search={fetchBooks}/>
      </React.Fragment>
    );

  if (props.history.location.pathname === '/books') {
    component = <SavedBooks unauthenticated={openModalHandler} />
  }

  return (
    <React.Fragment>
      <Login visible={visible} hide={closeModalHandler}/>
      <Header clicked={openModalHandler} toggle={toggleMenuHandler} show={menu} hide={closeBackdropHandler}/>
      {component}
    </React.Fragment>
  )
}

export default withRouter(Homepage);
