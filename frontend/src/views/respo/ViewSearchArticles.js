import React, { useState, useEffect, version } from "react";
//import { Button, Col, FormGroup } from "react-bootstrap";
//import Form from "react-bootstrap/Form";
import axios from "axios";

const EditArticle = ({ match }) => {
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
  useEffect(() => {
    async function fetchArticle() {
      const { data } = await axios.get(`/api/article/${match.params.name}`);
      SetArticle(data);
    }
    fetchArticle();
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
                            className="active nav-link"
                            style={{ color: "#9368E9" }} >
                            Info
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label>Nom Article</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="nom"
                                      value={article.name}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>prix_U_TTC</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.prix_U_TTC}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>prix_U_HT</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.prix_U_HT}
                                      readOnly
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
                                      rows={2}
                                      value={article.description}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>TVA</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.TVA}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label>Nom Categorie</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.category}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>unité</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.unite}
                                      readOnly
                                    />
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default EditArticle;
