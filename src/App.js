import React from 'react';
import Header from './components/header/Header';
import './App.module.scss';
import Main from './components/main/Main';

const App = () => {

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
