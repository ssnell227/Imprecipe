import React, { Component } from 'react';
import Axios from 'axios'

import RecipeBuilder from './components/recipe-builder'
import RecipeView from './components/recipe-view'
import SavedView from './components/saved-recipes'
import Header from './components/header'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRecipes: [],
      currentRecipe: {},
      view: 'home',
      menu: false,
    }
    this.switchView = this.switchView.bind(this)
    this.setCurrentRecipe = this.setCurrentRecipe.bind(this)
    this.getAllRecipes = this.getAllRecipes.bind(this)
    this.createNewRecipe = this.createNewRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    this.setState({
      menu: !this.state.menu
    })
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
      .then(res => this.setState({ allRecipes: res.data }))
      .catch(err => console.log(err))
  }

  deleteRecipe(id) {
    Axios.delete(`/api/recipes/${id}`)
      .then(res => this.setState({ allRecipes: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getAllRecipes()
  }


  render() {
    return (
      <div className='everything'>
        <Header 
        toggleMenu={this.toggleMenu} 
        menuClass={this.state.menu ? 'header-nav shown' : 'header-nav'} 
        switchView={this.switchView} 
        />
        <main className="App">
          <div>
            <h1>Imprescipe!</h1>
            {this.state.view === 'home' && <h3 className='secondary-title'>A recipe builder to standardize and organize your recipes</h3>}
          </div>
          {this.state.view === 'home' &&
            <div className=''>
              <button
                onClick={this.switchView}
                name='recipeBuilder'
                className='nav-button'
              >Start new recipe</button>
              <button
                onClick={this.switchView}
                name='savedView'
                className='nav-button'
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
        </main>
      </div>
    );
  }
}

export default App;
