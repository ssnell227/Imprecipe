import React, { Component } from 'react'

class SavedRecipes extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
        const {allRecipes} = this.props
        this.props.setCurrentRecipe(allRecipes.find(item => item.name === e.target.innerHTML))
        this.props.switchView(e)
    }

    render() {
        const allRecipesMap = this.props.allRecipes.map((item, index) => {
            return <button className='nav-button' name='recipeView' key={`allRecipes-${index}`} onClick={this.handleClick}>{item.name}</button>
        })
        return (
            <div className='savedRecipes'>
                <button className='nav-button' onClick={this.props.switchView} name='home'>Back</button>
                <h3 className='secondary-title'>Saved Recipes</h3>
                <br></br>
                {allRecipesMap}
            </div>
        )
    }
}

export default SavedRecipes