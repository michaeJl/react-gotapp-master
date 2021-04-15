import React from 'react';

import './header.sass';
import {Link} from 'react-router-dom';


const Header = () => {
    return (
        <div className="HeaderBlock d-flex justify-content-between align-items-center">
            <h3 className="HeaderTitle">
                <Link to="">
                Game of Thrones DB
                </Link>
            </h3>
            <ul className="HeaderLinks">
                <li>
                    <Link to="/caracters/">Characters</Link>
                </li>
                <li>
                    <Link to="/houses/">Houses</Link>
                </li>
                <li>
                    <Link to="/books/">Books</Link>   
                </li>
            </ul >
        </div>
    );
};

export default Header;