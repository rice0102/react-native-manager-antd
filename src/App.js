import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAthmwm9vfY4MGbEQXnOr1CCe8Qw5VIoGw',
      authDomain: 'manager-4cf0f.firebaseapp.com',
      databaseURL: 'https://manager-4cf0f.firebaseio.com',
      storageBucket: 'manager-4cf0f.appspot.com',
      messagingSenderId: '548659747074'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
