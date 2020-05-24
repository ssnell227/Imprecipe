import React from 'react'

function Header(props) {
    return (
        <div className='container'>
            <div className='App header'>
                <img onClick={props.switchView} name='home' src='images\gas-burner.png' alt='logo'></img>
                <img onClick={props.toggleMenu} className='hamburger' src='images\Hamburger_icon.svg.png' alt='menu'></img>
            <nav className={props.menuClass}>
                <button onClick={props.switchView} name='home' className='nav-button'>Home</button>
                <button onClick={props.switchView} name='recipeBuilder' className='nav-button'>Start New Recipe</button>
                <button onClick={props.switchView} name='savedView' className='nav-button'>Saved Recipes</button>
            </nav>
            </div>
        </div>
    )
}

export default Header