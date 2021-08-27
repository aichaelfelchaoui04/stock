import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
//Views
import HomeRespo from '../views/respo/Home'
import Clients from  '../views/respo/Clients'
import Commandes from  '../views/respo/Commandes'
import Articles from  '../views/respo/Articles'
import Fournisseurs from  '../views/respo/Fournisseurs'
import Categories from  '../views/respo/Categories'
//Components
import NavbarRespo from "../components/respo/navbar/Navbar"
import SidebarRespo from "../components/respo/sidebar/Sidebar"
import EditArticle from '../views/respo/EditArticle'
import ViewSearchArticles from '../views/respo/ViewSearchArticles'
import EditCategory from '../views/respo/EditCategory'
import EditClient from '../views/respo/EditClient'
import EditFournisseurs from '../views/respo/EditFournisseurs'
import EditCommande from '../views/respo/EditCommande'
import Footer from "../components/footer/Footer"

function Respo({ user }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const closeSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="container">
            <NavbarRespo sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
            <Switch>
                <Route path='/respo' component={HomeRespo} exact/>
                <Route path='/respo/commandes' component={Commandes} exact/>
                <Route path='/respo/clients' component={Clients} exact/>
                <Route path='/respo/suppliers' component={Fournisseurs} exact/>
                <Route path='/respo/categories' component={Categories} exact/>
                <Route path='/respo/articles' component={Articles} exact/>
                <Route path='/respo/articles/edit/:name' component={EditArticle} exact/>
                <Route path='/respo/articles/view/:name' component={ViewSearchArticles} exact/>
                <Route path='/respo/suppliers/:id' component={EditFournisseurs} exact/>
                <Route path='/respo/categories/:id' component={EditCategory} exact/>
                <Route path='/respo/clients/:id' component={EditClient} exact/>
                <Route path='/respo/commandes/:id' component={EditCommande} exact/>
            </Switch>
            <SidebarRespo sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
            <Footer/>
        </div>
    )
}

export default Respo
