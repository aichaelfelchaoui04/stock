import React, { useState, useEffect } from 'react'
import './Navbar.css'
import axios from 'axios'
import { useHistory } from "react-router";

const Navbar = ({ sidebarOpen, openSidebar }) => {

    const [searchRes, setSearchRes] = useState('');
    const history = useHistory();

    const openSearch = () =>{
        document.getElementById("myOverlay").style.display = "block"
    }

    const closeSearch = () => {
        document.getElementById("myOverlay").style.display = "none";
    }

    //fetch articles 
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        async function fetchCompte() {
        const { data } = await axios.get("/api/article");
        setArticles(data);
        }
        fetchCompte();
    }, []);

    const onChangeSearch = (e) => {
        setSearchRes(e.target.value)
    }

    const submitSearch = (e) => {
        if(articles.some(item => searchRes == item.name)){
            history.push({
                pathname: `articles/view/${searchRes}`
            })
        }
        else{
            alert('Article non trouvee');
            e.preventDefault()
        }
    }

    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                
            </div>
            <div className="navbar__right">
                <a onClick={openSearch}>
                    <i className="fa fa-search"></i>
                </a>
            </div>
            <div id="myOverlay" className='overlay'>
                <span className="closebtn" onClick={closeSearch} title="Close Overlay">×</span>
                <div className="overlay-content">
                    <form onSubmit={submitSearch}>
                        <input type="search" placeholder="Search.." name="search" onChange={onChangeSearch} />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
