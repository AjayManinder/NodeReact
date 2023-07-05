import React from "react";
import "./header.css";
import { Link } from "react-router-dom";


const Header = ()=>{
    return(
<div className="container">

<div className="innerContainer">

<div className="Main_Head_Logo">
<div > <img className="Header_Logo" src="https://purepng.com/public/uploads/thumbnail//google-stadia-logo-hd4.png" alt="Logo" /> </div>
<div className="Main_header"> Main Heading </div>
</div>
<div className="Links">

<Link className="Header_Links" to="./">HOME</Link>
<Link className="Header_Links" to="./about">ABOUT</Link>
<Link className="Header_Links" to="./contactUs">CONTACT_US</Link>
<Link className="Header_Links" to="./admin">TABLE</Link>
</div>

</div>

</div>
    );
};

export default Header;