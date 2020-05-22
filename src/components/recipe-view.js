import React, { Component } from 'react'

class RecipeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            equipment: ['',],
            ingredients: ['',],
            directions: ['',],
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.generateMaps = this.generateMaps.bind(this)
    }

    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    generateMaps() {
        const arrayOfMaps = []
        const {currentRecipe} = this.props
        for (let key in currentRecipe) {
            if (key !== "name" && key !== 'id')
            arrayOfMaps.push(currentRecipe[key].map((item, index) => {
                if (!this.state.isEditing && key === 'directions') {
                    return <li key={`directions-${index}`}>{item}</li>
                } else if (!this.state.isEditing) {
                    return <p key={`${key}-${index}`}>{item}</p>
                } else {
                    return <input placeholder={item} key={`${key}-${index}`}></input>
                }
            }))
        }
        return arrayOfMaps
    }

    render() {
        const { name, equipment, ingredients, directions } = this.props.currentRecipe

        return (
            <div>
                <button onClick={this.props.switchView} name='savedView'>Back</button>
                <button onClick={this.toggleEdit}>Edit</button>
                <h2>{name}</h2>
                <div className='equipment-display'>{this.generateMaps()[0]}</div>
                <div className='ingredients-display'>{this.generateMaps()[1]}</div>
                <ol className='directions-display'>{this.generateMaps()[2]}</ol>
            </div>
        )
    }
}

export default RecipeView