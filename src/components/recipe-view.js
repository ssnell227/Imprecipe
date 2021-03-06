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
        //update state
        this.toggleEdit = this.toggleEdit.bind(this)
        this.addInput = this.addInput.bind(this)
        this.deleteInput = this.deleteInput.bind(this)
        this.populateState = this.populateState.bind(this)
        this.handleChange = this.handleChange.bind(this)

        //trigger axios
        this.handleEditRecipe = this.handleEditRecipe.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAutofillInputs = this.handleAutofillInputs.bind(this)

        //render functions
        this.generateMaps = this.generateMaps.bind(this)

        //grouped functions 
        this.handleCancel = this.handleCancel.bind(this)
    }

    //update state
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


    handleChange(e) {
        let inputs = []
        let inputsKey

        for (let key in this.state) {
            if (key === e.target.name) {
                inputs = [...this.state[key]]
                inputsKey = key
            }
        }

        if (inputsKey === 'equipment') {
            inputs.splice(e.target.dataset.index, 1, e.target.value)
        } else if (inputsKey === 'name') {
            inputs = e.target.value
        } else if (inputsKey === 'directions') {
            inputs.splice(e.target.dataset.index, 1, e.target.value)
        } else if (e.target.dataset.name === 'name') {
            inputs[e.target.dataset.index].name = e.target.value
        } else if (e.target.dataset.name === 'amount') {
            inputs[e.target.dataset.index].amount = e.target.value
        }


        this.setState({
            [inputsKey]: inputs
        })
    }


    populateState() {
        const { currentRecipe } = this.props
        for (let key in currentRecipe) {
            this.setState({ [key]: currentRecipe[key] })
        }
        console.log('firing')
    }

    handleEditRecipe(e) {
        const { id, name, equipment, ingredients, directions } = this.state

        const recipe = { id, name, equipment, ingredients, directions }
        console.log(recipe)
        this.props.setCurrentRecipe(recipe)
        this.props.editRecipe(recipe)
        this.props.switchView(e)
        this.toggleEdit()
    }

    handleDelete(e) {
        this.props.deleteRecipe(this.state.id)
        this.props.switchView(e)
    }

    handleAutofillInputs(e) {
        this.handleChange(e)
        this.props.getAutoFill(e.target.value)
    }

    generateMaps() {
        const arrayOfMaps = []
        for (let key in this.state) {
            if (key === 'equipment') {
                arrayOfMaps.push(this.state[key].map((item, index) => {
                    if (!this.state.isEditing) {
                        return <div key={`${key}-${index}`}>
                            <p>{item}</p>
                        </div>
                    } else {
                        return <div key={`${key}-${index}`}>
                            <input
                                size={item.length}
                                data-index={index}
                                name={key}
                                onChange={this.handleChange}
                                placeholder={item}
                            ></input>
                            <button
                                className='delete-button'
                                name={key}
                                data-index={index}
                                onClick={this.deleteInput}
                            >X</button>
                        </div>
                    }
                }))
            } else if (key === 'directions') {
                arrayOfMaps.push(this.state[key].map((item, index) => {
                    if (!this.state.isEditing) {
                        return <div key={`${key}-${index}`}>
                            <li>{item}</li>
                        </div>
                    } else {
                        return <div key={`${key}-${index}`}>
                            <textarea
                                cols={50}
                                rows={item.length > 140 ? Math.ceil(item.length / 50) : 2}
                                data-index={index}
                                name='directions'
                                onChange={this.handleChange}
                                placeholder={item}
                            ></textarea>
                            <button
                                className='delete-button'
                                name={key}
                                data-index={index}
                                onClick={this.deleteInput}>X</button>
                        </div>
                    }
                }))
            } else if (key === 'ingredients') {
                arrayOfMaps.push(this.state[key].map((item, index) => {
                    if (!this.state.isEditing) {
                        return <div className='ingredient-item' key={`${key}-${index}`}>
                            <p>{item.name}</p>
                            <p>{item.amount}</p>
                            {/* <p></p> */}
                        </div>
                    } else {
                        return <div key={`${key}-${index}`}>
                            <input
                                list={`autofill-${index}`}
                                size={item.name.length || 10}
                                data-index={index}
                                name='ingredients'
                                data-name='name'
                                onChange={this.handleAutofillInputs}
                                placeholder={item.name}
                            ></input>
                            <datalist id={`autofill-${index}`}>
                                {this.props.autoFillArray.map((item, optionIndex) => <option
                                    value={item.name}
                                    key={`option-${optionIndex}`}
                                />)}
                            </datalist>
                            <input 
                            size={5} 
                            data-index={index} 
                            name='ingredients' 
                            data-name='amount' 
                            onChange={this.handleChange} 
                            placeholder={item.amount}
                            ></input>
                            <button 
                            className='delete-button' 
                            name={key} 
                            data-index={index} 
                            onClick={this.deleteInput}>X</button>
                        </div>
                    }
                }))
            }
        }
        return arrayOfMaps
    }

    handleCancel () {
        this.populateState()
        this.toggleEdit()
    }

    componentDidMount() {
        this.populateState()
    }

    

    render() {
        const { name } = this.props.currentRecipe
        const { isEditing } = this.state

        return (
            <section className='recipe-view'>
                {this.state.isEditing ? <input 
                size={name.length} 
                className='name-input' 
                name='name' 
                placeholder={name} 
                onChange={this.handleChange}
                ></input> : <h2 className='name'>{name}</h2>}
                <br />

                <button 
                className='nav-button' 
                onClick={this.handleCancel}
                >{this.state.isEditing ? 'Cancel' : 'Edit'}</button>

                {this.state.isEditing && <button 
                className='nav-button' 
                name='recipeView' 
                onClick={this.handleEditRecipe}
                >Save</button>}

                {this.state.isEditing && <button 
                className='nav-button' 
                name='home' 
                onClick={this.handleDelete}
                >Delete</button>}
                <div className='content'>
                    <div className='left-content'>
                        <div className='equipment-display'>
                            <h2>Equipment</h2>
                            {this.generateMaps()[0]}
                            {isEditing && <button 
                            name='equipment' 
                            onClick={this.addInput}
                            >Add equipment</button>}
                        </div>

                        <div className='ingredients-display'>
                            <h2>Ingredients</h2>
                            {this.generateMaps()[1]}
                            {isEditing && <button 
                            name='ingredients' 
                            onClick={this.addInput}
                            >Add Ingredient</button>}
                        </div>
                    </div>

                    <div className='directions-display'>
                        <h2>Directions</h2>
                        <ol >{this.generateMaps()[2]}</ol>
                        {isEditing && <button 
                        name='directions' 
                        onClick={this.addInput}
                        >Add Directions</button>}
                    </div>
                </div>
            </section>
        )
    }
}

export default RecipeView