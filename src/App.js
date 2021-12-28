import React from 'react';
import './App.css';
import { Header } from './components/header';
import { ItemList } from './components/ItemList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ItemList></ItemList>
    </div>
  );
}

export default App;
