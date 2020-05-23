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
            return <button name='recipeView' key={`allRecipes-${index}`} onClick={this.handleClick}>{item.name}</button>
        })
        return (
            <div className='savedRecipes'>
                <button onClick={this.props.switchView} name='home'>Back</button>
                <br></br>
                {allRecipesMap}
            </div>
        )
    }
}

export default SavedRecipes