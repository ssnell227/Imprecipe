import React, { Component } from 'react';

import RecipeBuilder from './components/recipe-builder'
import RecipeView from './components/recipe-view'

import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRecipe: {},
      view: ''
    }
  }
  render() {
    return (
      <div className="App">
        <header>

        </header>
        <div className=''>
          <button></button>
          <button></button>
        </div>
      <RecipeBuilder/>
      <RecipeView/>
      </div>
    );
  }
}

export default App;
