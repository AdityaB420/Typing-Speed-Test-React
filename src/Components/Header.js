import React from "react";
import AccountCircle from "./AccountCircle";
import logo from '../Assets/logo.png'


const Header=()=>{
    return(
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" style={{ width: '10rem' }} />
            </div>
            <div className="user-icon">
                <AccountCircle />
            </div>
        </div>
    )
}


export default Header;