import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const EditArticle = ({ match }) => {
  debugger;
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
  const history = useHistory();
  function handleArticleChange(e) {
    debugger;
    const { name, value } = e.target;
    SetArticle({ ...article, [name]: value });
  }
  useEffect(() => {
    async function fetchArticle() {
      const { data } = await axios.get(`http://localhost:3000/article/${match.params.name}`);
      SetArticle(data);
    }
    fetchArticle();
  }, []);
  function updateArticle() {
    let form_data = new FormData();
    form_data.append("name", article.name);
    form_data.append("prix_U_TTC", article.prix_U_TTC);
    form_data.append("prix_U_HT", article.prix_U_HT);
    form_data.append("description", article.description);
    form_data.append("TVA", article.TVA);
    form_data.append("category", article.category);
    form_data.append("unite", article.unite);
    debugger;
    axios
      .put(`http://localhost:3000/article/${match.params.name}`, form_data)
      .then((response) => {
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
        alert("article mis a jour avec succees");
      });
    SetArticle(form_data);
    history.push({
      pathname: '/respo/articles'
    })
  }
  //fetchCategories
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const { data } = await axios.get("http://localhost:3000/category");
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <main>
      <div className="main__container">
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
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={updateArticle}>
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
                                        placeholder="Nom Article"
                                        onChange={handleArticleChange}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>prix_U_TTC</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="prix_U_TTC"
                                        value={article.prix_U_TTC}
                                        placeholder="prix_U_TTC"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>prix_U_HT</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="prix_U_HT"
                                        value={article.prix_U_HT}
                                        placeholder="prix_U_HT"
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
                                      <label>TVA</label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        name="TVA"
                                        value={article.TVA}
                                        placeholder="TVA"
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
                                        name="category"
                                        value={article.category}
                                        onChange={handleArticleChange}
                                      >
                                        {categories.map((category) => (
                                          <option
                                            key={category.name}
                                            value={category.name}
                                          >
                                            {category.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Unité</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="unite"
                                        value={article.unite}
                                        placeholder="Options"
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
    </main>
  );
};
export default EditArticle;
