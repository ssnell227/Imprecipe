const express = require('express')

const app = express()

const ctrl = require('./controller')

const SERVER_PORT = 4500

app.use(express.json())

//endpoints
app.get('/api/recipes/', ctrl.getAllRecipes)

app.get('/api/recipes/:id', ctrl.getRecipeById)

app.post('/api/recipes', ctrl.createNewRecipe)

app.put('/api/recipes/:id', ctrl.editRecipe)

app.delete('/api/recipes/:id', ctrl.deleteRecipe)


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))