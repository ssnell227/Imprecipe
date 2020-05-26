# Application concept
  -A recipe building wizard to simplify and standardize your recipes
  -Use spoonacular API to convert units and provide nutrition information

## Functionality
    -The landing page will provide you with the option of viewing previous recipes or starting a new recipe wizard
    -The saved recipes page will give a list of saved recipes to view.  The following view page will display the recipe by mapping the values of the object to a template.  This view will display edit and delete buttons as well
    -The recipe wizard will run you through a series of forms with suggested inputs, saving all inputs to a currentRecipe object in App’s state.  Once finished, the recipe will prompt you to save the recipe

## Endpoints
    -local endpoints
        -GET -fetch all saved recipes
        -GET -fetch recipe by ID
        - POST - save a recipe object to a database.js file
        - PUT - edit recipe by ID
        - DELETE -delete recipe by ID
- Spoonacular enpoints
    -GET -fetch ingredient autocompletes w/queries

### Component Architecture
    - App.js (stateful: current recipe, view: wizard/savedRecipes/viewRecipe)
    - Header (functional)
    -Saved recipes (stateful)
    -Recipe view (stateful)
    -Recipe wizard (stateful)
