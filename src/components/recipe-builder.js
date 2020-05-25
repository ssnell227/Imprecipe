import React, { Component } from 'react'

class RecipeBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            equipment: ['',],
            ingredients: [{ name: '', amount: '' }],
            directions: ['',],
            stage: 1
        }
        this.addInput = this.addInput.bind(this)
        this.deleteInput = this.deleteInput.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this)
        this.changeName = this.changeName.bind(this)
        this.nextStage = this.nextStage.bind(this)
        this.prevStage = this.prevStage.bind(this)
    }

    nextStage() {
        let { stage } = this.state
        console.log(stage)
        stage < 4 && stage ++
        this.setState({ stage })
    }
    prevStage() {
        let { stage } = this.state
        stage > 1 && stage --
        this.setState({ stage })
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

        if (inputsKey !== 'ingredients') {
            inputs.push('')
        } else {
            inputs.push({
                name: '',
                amount: '',
            })
        }

        this.setState({
            [inputsKey]: inputs
        })
    }

    deleteInput(e) {
        let inputs, inputsKey

        for (let key in this.state) {
            if (key === e.target.name) {
                inputs = this.state[key]
                inputsKey = key
            }
        }
        inputs.splice(e.target.dataset.index, 1)
        this.setState({
            [inputsKey]: inputs
        })
    }

    changeName(e) {
        this.setState({
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

        if (inputsKey === 'equipment') {
            inputs.splice(e.target.step, 1, e.target.value)
        } else if (inputsKey === 'directions') {
            inputs.splice(e.target.dataset.index, 1, e.target.value)
        } else if (e.target.placeholder === 'name') {
            inputs[e.target.step].name = e.target.value
        } else if (e.target.placeholder === 'amount') {
            inputs[e.target.step].amount = e.target.value
        }


        this.setState({
            [inputsKey]: inputs
        })
    }

    handleCreateRecipe(e) {
        const { name, equipment, ingredients, directions } = this.state
        console.log(this.props.allRecipes)
        const recipe = { name, equipment, ingredients, directions }
        if (this.props.allRecipes.findIndex(item => item.name.toLowerCase() === recipe.name.toLowerCase()) !== -1) {
            window.alert('A recipe with this name already exists')
        } else if (recipe.name) {
            this.props.setCurrentRecipe(recipe)
            this.props.createNewRecipe(recipe)
            this.props.switchView(e)
        } else {
            window.alert('Add a name before saving the recipe')
        }
    }

    render() {
        const { equipment, ingredients, directions } = this.state

        //map each array in state to a set of inputs
        const equipmentMap = equipment.map((item, index) => {
            return <div key={`equipment-${index}`} className='equipment-item'>
                <input
                    onChange={this.handleChange}
                    name={'equipment'}
                    step={index}
                    value={this.state.equipment[index]}
                ></input>
                <button className='delete-button' data-index={index} name='equipment' onClick={this.deleteInput}>X</button>
            </div>
        })
        const ingredientsMap = ingredients.map((item, index) => {
            return <div key={`ingredients-${index}`} className='ingredients-item'>
                <input
                    onChange={this.handleChange}
                    name='ingredients'
                    placeholder='name'
                    value={this.state.ingredients[index].name}
                    step={index}
                ></input>

                <input
                    onChange={this.handleChange}
                    name='ingredients'
                    placeholder='amount'
                    value={this.state.ingredients[index].amount}
                    step={index}
                ></input>
                <button className='delete-button' name='ingredients' onClick={this.deleteInput} data-index={index}>X</button>

            </div>
        })
        const directionsMap = directions.map((item, index) => {
            return <div key={`directions-${index}`} className='directions-item'>
                <textarea
                    rows='3'
                    cols='50'
                    onChange={this.handleChange}
                    data-index={index}
                    name={'directions'}
                    value={this.state.directions[index]}
                    key={`directions-${index}`}
                ></textarea>
                <button className='delete-button' name='directions' onClick={this.deleteInput} data-index={index}>X</button>

            </div>
        })
        return (
            <section className='recipeBuilder'>

                {this.state.stage === 1 && <div>
                    <h3 className='prompt'>What's your recipe's name?</h3>
                    <input class='name-input' onChange={this.changeName}></input>
                    <br/>
                    <button onClick={this.nextStage}>Next</button>
                </div>}

                {this.state.stage === 2 && <div className='equipment'>
                <h3 className='prompt'>Any special equipment?</h3>
                    {equipmentMap}
                    <button onClick={this.prevStage}>Back</button>
                    <button onClick={this.addInput} name='equipment'>Add equipment</button>
                    <button onClick={this.nextStage}>Next</button>
                </div>}

                {this.state.stage === 3 && <div className='ingredients'>
                <h3 className='prompt'>Time to add some ingredients.  Don't forget units!</h3>
                    {ingredientsMap}
                    <button onClick={this.prevStage}>Back</button>
                    <button onClick={this.addInput} name='ingredients'>Add ingredient</button>
                    <button onClick={this.nextStage}>Next</button>
                </div>}

                {this.state.stage === 4 && <div className='directions'>
                <h3 className='prompt'>Alright, now how do you make it?</h3>
                    {directionsMap}
                    <button onClick={this.addInput} name='directions'>Add direction</button>
                    <br/>
                    <button onClick={this.prevStage}>Back</button>
                    <br/>
                <button name='recipeView' onClick={this.handleCreateRecipe} className='save-button'>Save Recipe</button>
                </div>}

            </section>
        )
    }
}

export default RecipeBuilder