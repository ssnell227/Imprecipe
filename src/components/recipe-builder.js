import React, { Component } from 'react'

class RecipeBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            equipment: ['',],
            ingredients: ['',],
            directions: ['',],
        }
        this.addInput = this.addInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this)
        this.changeName= this.changeName.bind(this)
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

    changeName (e) {
        this.setState ({
            name: e.target.value
        })
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
        console.log(e.target, e.target.step, e.target.name)

        inputs.splice(e.target.step, 1, e.target.value)

        this.setState({
            [inputsKey]: inputs
        })
    }

    handleCreateRecipe () {
        const {name, equipment, ingredients, directions} = this.state

        const recipe = {name, equipment, ingredients, directions}
        this.props.setCurrentRecipe(recipe)
        this.props.createNewRecipe(recipe)
    }

    render() {
        const { equipment, ingredients, directions } = this.state

//map each array in state to a set of inputs
        const equipmentMap = equipment.map((item, index) => {
            return <input
                onChange={this.handleChange}
                name={'equipment'}
                step={index}
                value={this.state.equipment[index]}
                key={`equipment-${index}`}
            ></input>
        })
        const ingredientsMap = ingredients.map((item, index) => {
            return <input
                onChange={this.handleChange}
                step={index}
                name={'ingredients'}
                value={this.state.ingredients[index]}
                key={`ingredient-${index}`}
            ></input>
        })
        const directionsMap = directions.map((item, index) => {
            return <input
                onChange={this.handleChange}
                step={index}
                name={'directions'}
                value={this.state.directions[index]}
                key={`directions-${index}`}
            ></input>
        })
        return (
            <div className='recipeBuilder'>
                <nav>
                    <button name='home' onClick={this.props.switchView}>Back</button>
                </nav>
                <span>Name:</span><input onChange={this.changeName}></input>
                <div className='equipment'>
                    {equipmentMap}
                    <button onClick={this.addInput} name='equipment'>Add equipment</button>
                </div>
                <div className='ingredients'>
                    {ingredientsMap}
                    <button onClick={this.addInput} name='ingredients'>Add ingredient</button>
                </div>
                <div className='directions'>
                    {directionsMap}
                    <button onClick={this.addInput} name='directions'>Add direction</button>

                </div>
                <button onClick={this.handleCreateRecipe} className='save-button'>Save Recipe</button>
            </div>
        )
    }
}

export default RecipeBuilder