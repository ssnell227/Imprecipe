const recipes = [
    {
        id: 0,
        name: 'sample',
        equipment: ['sheet-pan', 'stand-mixer'],
        ingredients: ['all-purpose flour', 'baking soda', 'sugar'],
        directions: ['Set oven to 400 degrees', 'Mix dry ingredients']
    },
    {
        id: 1,
        name: 'sample',
        equipment: ['sheet-pan', 'stand-mixer'],
        ingredients: ['all-purpose flour', 'baking soda', 'sugar'],
        directions: ['Set oven to 400 degrees', 'Mix dry ingredients']
    },
    {
        id: 2,
        name: 'sample',
        equipment: ['sheet-pan', 'stand-mixer'],
        ingredients: ['all-purpose flour', 'baking soda', 'sugar'],
        directions: ['Set oven to 400 degrees', 'Mix dry ingredients']
    }
]

let id = 3

module.exports = {
    getAllRecipes: (req, res) => {
        res.status(200).send(recipes)
    },
    getRecipeById: (req, res) => {
        const {id} = req.params

        const recipe = recipes.find(item => item.id === +id)

        res.status(200).send(recipes)
    },
    createNewRecipe: (req, res) => {
        const {name, equipment, ingredients, directions} = req.body
        const newRecipe = {id, name, equipment, ingredients, directions}
        recipes.push(newRecipe)
        id++
        res.status(201).send(recipes)
    },
    editRecipe: (req, res) => {
        const {id} = req.params

        const index = recipes.findIndex(item => item.id === +id)

        console.log(index)

        const {name, equipment, ingredients, directions} = req.body

        const updatedRecipe = {
            id,
            name: name || recipes[index].name,
            equipment: equipment || recipes[index].equipment,
            ingredients: ingredients || recipes[index].ingredients,
            directions: directions || recipes[index].directions,
        }

        recipes.splice(index, 1, recipes)

        res.status(200).send(recipes[index])
    },
    deleteRecipe: (req, res) => {
        const {id} = req.params

        const index = recipes.findIndex(item => item.id === +id)

        recipes.splice(index, 1)

        res.status(200).send(recipes)
    },
}