import React from 'react'

function Button (props) {
    return (
        <button name='recipeView' onClick={props.handleClick}>{props.item.name}</button>
    )
}

export default Button