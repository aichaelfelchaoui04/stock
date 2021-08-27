import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="container-fluid">
					<nav className="pull-left">
						<ul className="nav">
							<li className="nav-item">
		                        <span className="spanFooter">Gestion de Stock</span>
							</li>
						</ul>
					</nav>
					<div className="copyright ml-auto">
						2021, made with <i className="fa fa-heart heart text-primary"></i> by 
					</div>				
			</div>
        </div>
    )
}

export default Footer