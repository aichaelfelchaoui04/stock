import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Articles = () => {
  const initialArticle = {
    id: null,
    name: "",
    prix_U_TTC: 0,
    prix_U_HT: 0,
    description: "",
    TVA: 0,
    category: "",
    unite: "",
    
  };
  const [article, SetArticle] = useState(initialArticle);
  function handleArticleChange(e) {
    debugger;
    const { name, value } = e.target;
    SetArticle({ ...article, [name]: value });
  }

  function submitArticle() {
    let form_data = new FormData();
    form_data.append("name", article.name);
    form_data.append("prix_U_TTC", article.prix_U_TTC);
    form_data.append("prix_U_HT", article.prix_U_HT);
    form_data.append("description", article.description);
    form_data.append("TVA", article.TVA);
    form_data.append("category", article.category);
    form_data.append("unite", article.unite);
    debugger;

    axios.post("http://localhost:3001/article/add", form_data).then((response) => {
      SetArticle({
        id: response.data.id,
        name: response.data.name,
        prix_U_TTC: response.data.prix_U_TTC,
        prix_U_HT: response.data.prix_U_HT,
        description: response.data.description,
        TVA: response.data.TVA,
        category: response.data.category,
        unite: response.data.unite,
      });
      alert("Article ajoute avec succees");
      window.location.reload();
    });
    SetArticle(form_data);
  }
  //fetchCategories
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const { data } = await axios.get("http://localhost:3001/category");
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  //edit&delete
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const { data } = await axios.get("http://localhost:3001/article/edit");
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  function deleteArticles(nom) {
    axios.delete(`http://localhost:3000/article/delete/${nom}`).then((response) => fetchArticles());
    alert("L'article " + nom + " a ete supprimee avec succees");
  }
  const Add = () => {
    document.querySelector(".Add").style.display = "block";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
  };

  const Edit = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "block";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
  };

  const Delete = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "block";
    document.querySelector(".views").style.display = "none";
  };

  const [show, setShow] = useState(false);
  const [IdA, setId] = useState();

  const handleOpen = (id) => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greetingArticle">
            {/* <h1><a href="" className="routerPath"><i className="fas fa-home"></i></a> <span><i className="fas fa-chevron-right"></i></span> <a href="" className="routerPathSec">Articles</a></h1>  */}
            <h1>Articles</h1>
            <div className="buttons">
              <button
                type="button"
                className="btn btn-success"
                onClick={Add}
                style={{ width: "80px" }}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-info mx-2"
                onClick={Edit}
              >
                Modifier
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={Delete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        {/* view all */}
        <div className="views">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "5%" }}>unité</th>
                                  <th style={{ width: "3%" }}>Prix_unit_HT</th>
                                  <th style={{ width: "3%" }}>TVA</th>
                                  <th style={{ width: "3%" }}>Prix_unit_TTC</th>
                                  <th style={{ width: "3%" }}>nom_category</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr>
                                    <td>{article.name}</td>
                                    <td>{article.price_HT}</td>
                                    <td>{article.price_TTC}</td>
                                    <td>{article.description}</td>
                                    <td>{article.unite}</td>
                                    <td>{article.category}</td>
                                    <td>{article.TVA}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Article */}
        <div className="Add">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href
                              className="active nav-link"
                              style={{ color: "#000" }}
                            >
                              Ajouter Article
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitArticle}>
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom Article</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="name"
                                          value={article.name}
                                          placeholder="Nom Artice"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Prix_unit_HT</label>
                                        <input
                                          className="form-control"
                                          type="number"
                                          name="price_HT"
                                          value={article.price_HT}
                                          placeholder="Prix"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Prix_unit_TTC</label>
                                        <input
                                          className="form-control"
                                          type="number"
                                          name="price_TTC"
                                          value={article.price_TTC}
                                          placeholder="Prix"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                          className="form-control"
                                          type="text"
                                          name="description"
                                          value={article.description}
                                          rows="3"
                                          placeholder="Desctiption"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>unité</label>
                                        <input
                                          className="form-control"
                                          type="number"
                                          name="unite"
                                          value={article.unite}
                                          placeholder="unite"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Categorie</label>
                                        <select
                                          className="form-control"
                                          type="text"
                                          name="category"
                                          value={article.category}
                                          onChange={handleArticleChange}
                                        >
                                          {categories.map((cat) => (
                                            <option>{cat.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>TVA</label>
                                        <input
                                          name="TVA"
                                          type="text"
                                          className="form-control"
                                          value={article.TVA}
                                          placeholder="TVA"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button
                                    className="btnSave btn-primary"
                                    type="submit"
                                    onSubmit={submitArticle}
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modify Article */}
        <div className="Edit">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href
                              className="active nav-link"
                              style={{ color: "#000" }}
                            >
                              Modifier Article
                            </a>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                              <tr>
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "5%" }}>unité</th>
                                  <th style={{ width: "3%" }}>Prix_unit_HT</th>
                                  <th style={{ width: "3%" }}>TVA</th>
                                  <th style={{ width: "3%" }}>Prix_unit_TTC</th>
                                  <th style={{ width: "3%" }}>nom_category</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr key={article.id}>
                                    <td>
                                      <img
                                        src={article.image}
                                        className="articleImage"
                                      />
                                    </td>
                                    <td>{article.name}</td>
                                    <td>{article.price_HT}</td>
                                    <td>{article.price_TTC}</td>
                                    <td>{article.description}</td>
                                    <td>{article.category}</td>
                                    <td>{article.unite}</td>
                                    <td>{article.TVA}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          href={`articles/edit/${article.name}`}
                                        >
                                          <i className="fa fa-edit"></i>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer cet article?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <Button variant="info" onClick={() => {handleClose()}} block>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    deleteArticles(IdA);
                    handleClose();
                  }}
                  block
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* Delete Article */}
        <div className="Delete">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href
                              className="active nav-link"
                              style={{ color: "#000" }}
                            >
                              Supprimer Article
                            </a>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                              <tr>
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "5%" }}>unité</th>
                                  <th style={{ width: "3%" }}>Prix_unit_HT</th>
                                  <th style={{ width: "3%" }}>TVA</th>
                                  <th style={{ width: "3%" }}>Prix_unit_TTC</th>
                                  <th style={{ width: "3%" }}>nom_category</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr key={article.id}>
                                    <td>{article.name}</td>
                                    <td>{article.price_HT}</td>
                                    <td>{article.price_TTC}</td>
                                    <td>{article.description}</td>
                                    <td>{article.category}</td>
                                    <td>{article.unite}</td>
                                    <td>{article.TVA}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(article.name)
                                            handleOpen();
                                          }}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Articles;
