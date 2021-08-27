import React, { useState } from "react";
import "./Sidebar.css"
import Logo from "../../../img/logo.png"
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    const history = useHistory();

    return (
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={Logo} alt="_logo" />
                    <h1>Gestion de Stock</h1>
                </div>
                <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}></i>
            </div>
            <div className="sidebar__menu">
                <div onClick={() => history.push('/respo')} className="sidebar__linkActive">
                    <div className="linkA">
                        <i className="fa fa-home"/>
                        <span className="name">Dashboard</span> 
                    </div>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink to="/respo/articles" className="link">
                        <i class="fas fa-newspaper"></i>
                        <span className="name">Articles</span> 
                    </NavLink>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink  to="/respo/categories" className="link"> 
                        <i className="fas fa-list-alt"/>
                        <span className="name">Categories</span> 
                    </NavLink>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink to="/respo/suppliers" className="link">
                        <i class="fas fa-industry"></i>                        
                        <span className="name">Fournisseurs</span> 
                    </NavLink>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink to="/respo/clients" className="link">
                        <i className="fas fa-users"/>
                        <span className="name">Clients</span> 
                    </NavLink>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink to="/respo/commandes" className="link">
                        <i class="fas fa-bookmark"></i>                        
                        <span className="name">Commandes</span> 
                    </NavLink>
                </div>
                <hr className="solid"></hr>
                <div className="sidebar__link">
                    <NavLink className="sidebar__logout" to='/login'>
                        <i className="fa fa-power-off"/>
                        <span>Se Deconnecter</span> 
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;