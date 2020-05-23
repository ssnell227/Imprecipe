import React, { Component } from 'react'

class RecipeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            name: '',
            id: null,
            equipment: ['',],
            ingredients: ['',],
            directions: ['',],
        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.generateMaps = this.generateMaps.bind(this)
        this.addInput = this.addInput.bind(this)
        this.populateState = this.populateState.bind(this)
        this.handleEditRecipe = this.handleEditRecipe.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }


    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    addInput(e) {
        let inputs
        let inputsKey

        for (let key in this.state) {
            if (key === e.target.name) {
                inputs = this.state[key]
                inputsKey = key
            }
        }

        inputs.push('')

        this.setState({
            [inputsKey]: inputs
        })
    }

    handleEditRecipe(e) {
        const { id, name, equipment, ingredients, directions } = this.state

        const recipe = { id, name, equipment, ingredients, directions }
        console.log(recipe)
        this.props.setCurrentRecipe(recipe)
        this.props.editRecipe(recipe)
        this.props.switchView(e)
    }

    handleChange(e) {
        let inputs
        let inputsKey

        for (let key in this.state) {
            if (key === e.target.name) {
                inputs = this.state[key]
                inputsKey = key
            }
        }
        if (typeof inputs === 'object') {
            inputs.splice(e.target.step, 1, e.target.value)
            this.setState({
                [inputsKey]: inputs
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    generateMaps() {
        const arrayOfMaps = []
        for (let key in this.state) {
            if (key !== 'isEditing' && key !== 'name' && key !== 'id') {
                arrayOfMaps.push(this.state[key].map((item, index) => {
                    if (!this.state.isEditing && key === 'directions') {
                        return <li key={`directions-${index}`}>{item}</li>
                    } else if (!this.state.isEditing) {
                        return <p key={`${key}-${index}`}>{item}</p>
                    } else {
                        return <input step={index} name={key} onChange={this.handleChange} placeholder={item} key={`${key}-${index}`}></input>
                    }
                }))
            }
        }
        return arrayOfMaps
    }

    populateState() {
        const { currentRecipe } = this.props
        for (let key in currentRecipe) {
            this.setState({ [key]: currentRecipe[key] })
        }
    }

    handleDelete(e) {
        this.props.deleteRecipe(this.state.id)
        this.props.switchView(e)
    }

    componentDidMount() {
        this.populateState()
    }

    render() {
        const { name } = this.props.currentRecipe
        const { isEditing } = this.state

        return (
            <div>
                <button onClick={this.props.switchView} name='savedView'>Saved Recipes</button>
                <button onClick={this.toggleEdit}>Edit</button>
                {this.state.isEditing && <button name='savedView' onClick={this.handleEditRecipe}>Save</button>}
                {this.state.isEditing && <button name='home' onClick={this.handleDelete}>Delete</button>}
                {this.state.isEditing ? <input name='name' placeholder={name} onChange={this.handleChange}></input> : <h2>{name}</h2>}

                <div className='equipment-display'>{this.generateMaps()[0]}</div>
                {isEditing && <button name='equipment' onClick={this.addInput}>Add equipment</button>}

                <div className='ingredients-display'>{this.generateMaps()[1]}</div>
                {isEditing && <button name='ingredients' onClick={this.addInput}>Add Ingredient</button>}

                <ol className='directions-display'>{this.generateMaps()[2]}</ol>
                {isEditing && <button name='directions' onClick={this.addInput}>Add Directions</button>}
            </div>
        )
    }
}

export default RecipeView