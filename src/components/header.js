import React from 'react'

function Header(props) {
    function runBoth (e) {
        props.toggleMenu()
        props.switchView(e)
    }
    return (
        <header 
        className='container'
        >
            <div 
            className='App header'
            >
                <img 
                onClick={props.switchView} 
                name='home' 
                src='images\gas-burner.png' 
                alt='logo'
                ></img>
                {props.view !== 'home' && <h2 className='header-title'>Imprecipe!</h2>}
                <img 
                onClick={props.toggleMenu} 
                className='hamburger' 
                src='images\Hamburger_icon.svg.png' 
                alt='menu'
                ></img>
                <nav className={props.menuClass}>
                    <button 
                    onClick={runBoth} 
                    name='home' 
                    className='nav-button'
                    >Home</button>
                    <button 
                    onClick={runBoth} 
                    name='recipeBuilder' 
                    className='nav-button'
                    >Start New Recipe</button>
                    <button 
                    onClick={runBoth} 
                    name='savedView' 
                    className='nav-button'
                    >Saved Recipes</button>
                </nav>
            </div>
        </header>
    )
}

export default Header