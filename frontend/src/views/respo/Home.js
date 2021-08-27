import React, {  useState  , useEffect  } from "react";
import  axios from  'axios'
import Chart from '../../components/respo/charts/chart'


const Home = () => {

    //fetch categories
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        const { data } = await axios.get("/api/category");
        setCategories(data);
    }

    //fetch commandes
    const [commandes, setCommandes] = useState([]);

    async function fetchCommandes() {
        const { data } = await axios.get("/api/commande");
        setCommandes(data);
    }

    //fetch articles
    const [articles, setArticles] = useState([]);

    async function fetchArticles() {
      const { data } = await axios.get("/api/article");
      setArticles(data);
    }

    //fetch clients
    const [clients, setClients] = useState([]);

    async function fetchClients() {
        const { data } = await axios.get("/api/client");
        setClients(data);
    }

    // //fetch fournisseurs
    const [fournisseurs, SetFournisseurs] = useState([]);

    async function fetchFournisseurs() {
        const { data } = await axios.get("/api/supplier");
        SetFournisseurs(data);
    }

    // //fetch comptes
    const [comptes, setComptes] = useState([]);

    async function fetchComptes() {
        const { data } = await axios.get("/api/compte");
        setComptes(data);
    }

    useEffect(() => {
        fetchCategories();
        fetchCommandes();
        fetchArticles();
        fetchClients();
        fetchComptes();
        fetchFournisseurs();
    }, []);

    return (
        <main>
            <div className="main__container">
                <div className="main__title">
                    <div className="main__greeting">
                        <h1>Bonjour Mr. Responsable</h1>
                        <p>Bienvenue dans votre tableau de bord</p>
                    </div>
                </div>
                <div className="cardStaff">
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCardStaff">
                                Nombre du staff
                            </div>
                            <span className="font-bold text-title">{comptes.length}</span>
                        </div>
                    </div>
                </div>

                <div className="second__cards">
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCard">
                                № &nbsp; du commandes
                            </div>
                            <span className="font-bold text-title">{commandes.length}</span>
                        </div>
                    </div>
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCard">
                                № &nbsp; de categories
                            </div>
                            <span className="font-bold text-title">{categories.length}</span>
                        </div>
                    </div>
                </div>

                <div className="main__cards">
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCard">
                                № &nbsp; de clients
                            </div>
                            <span className="font-bold text-title">{clients.length}</span>
                        </div>
                    </div>
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCard">
                                № &nbsp; de fournisseurs
                            </div>
                            <span className="font-bold text-title">{fournisseurs.length}</span>
                        </div>
                    </div>
                    <div className="cardDashboard">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCard">
                                № &nbsp; d'articles
                            </div>
                            <span className="font-bold text-title">{articles.length}</span>
                        </div>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts_title">
                        <h1>Charts Visualization</h1>
                    </div>
                    <Chart/>
                </div>
            </div>
        </main>
    )
}

export default Home
