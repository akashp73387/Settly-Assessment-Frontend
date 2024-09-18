import React from 'react';
import Home from './Components/Home';
import store from './Redux/Store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <>
    <Provider store={store}>
    <Home />
    </Provider>
      
    </>
    
    
  );
};

export default App;