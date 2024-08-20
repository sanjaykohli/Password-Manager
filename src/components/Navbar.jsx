import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-purple-200 flex justify-around items-center px-4 h-10">
            <div className="logo"></div>
            <ul>
                <li className='flex gap-4'>
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#"></a>
                    <a href="#"></a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar