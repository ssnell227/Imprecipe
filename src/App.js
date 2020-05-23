import React, { Component } from 'react';
import Axios from 'axios'

import RecipeBuilder from './components/recipe-builder'
import RecipeView from './components/recipe-view'
import SavedView from './components/saved-recipes'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRecipes: [],
      currentRecipe: {},
      view: 'home',
    }
    this.switchView = this.switchView.bind(this)
    this.setCurrentRecipe = this.setCurrentRecipe.bind(this)
    this.getAllRecipes = this.getAllRecipes.bind(this)
    this.createNewRecipe = this.createNewRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  switchView(e) {
    this.setState({
      view: e.target.name
    })
  }

  setCurrentRecipe(recipeObj) {
    this.setState({
      currentRecipe: recipeObj
    })
  }

  // axios requests
  getAllRecipes() {
    Axios.get('/api/recipes/')
      .then(res => this.setState({ allRecipes: res.data }))
      .catch(err => console.log(err))
  }

  getRecipeById(id) {
    Axios.get(`/api/recipes/${id}`)
      .then(res => this.setState({ currentRecipe: res.data }))
      .catch(err => console.log(err))
  }

  createNewRecipe(recipeObj) {
    Axios.post('/api/recipes/', recipeObj)
    .then(res => this.setState({ allRecipes: res.data }))
    .catch(err => console.log(err))
  }

  editRecipe(recipeObj) {
    Axios.put(`/api/recipes/${recipeObj.id}`, recipeObj)
    .then(res => this.setState({allRecipes: res.data}))
    .then(res => console.log(res.body))
    .catch(err => console.log(err))
  }

  deleteRecipe(id) {
    Axios.delete(`/api/recipes/${id}`)
    .then(res => this.setState({allRecipes: res.data}))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getAllRecipes()
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Imprescipe!</h1>
          <h3>A recipe builder to standardize and organize your recipes</h3>
        </header>
        {this.state.view === 'home' &&
          <div className=''>
            <button
              onClick={this.switchView}
              name='recipeBuilder'
            >Start new recipe</button>
            <button
              onClick={this.switchView}
              name='savedView'
            >Saved recipes</button>
          </div>}

        {/* recipe builder component */}
        {this.state.view === 'recipeBuilder' &&
          <RecipeBuilder
            switchView={this.switchView}
            setCurrentRecipe={this.setCurrentRecipe}
            createNewRecipe={this.createNewRecipe}
            allRecipes={this.state.allRecipes}
          />}

        {/* saved recipes component */}
        {this.state.view === 'savedView' &&
          <SavedView
            switchView={this.switchView}
            allRecipes={this.state.allRecipes}
            setCurrentRecipe={this.setCurrentRecipe}
            
          />}

        {/* individual recipe component */}
        {this.state.view === 'recipeView' &&
          <RecipeView
            switchView={this.switchView}
            currentRecipe={this.state.currentRecipe}
            setCurrentRecipe={this.setCurrentRecipe}
            deleteRecipe={this.deleteRecipe}
            editRecipe={this.editRecipe}
          />}
      </div>
    );
  }
}

export default App;
