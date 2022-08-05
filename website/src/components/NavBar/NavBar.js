import React from "react";
import {  Link } from "react-router-dom";
import WalletConnection from "../WalletConnection/WalletConnection";
import './NavBar.css';

const NavBar = ()=>{
    return(
         <ul>
            <li className="pages">
                 <Link to="/">Home</Link>
             </li>
             <li className="pages">
                <Link to="/marketplace">Marketplace</Link>
             </li>
             <li className="wallet">
                <WalletConnection/>
             </li>
        </ul>
        
    );
}

export default NavBar;