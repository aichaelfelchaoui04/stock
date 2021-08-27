import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Alert } from "react-bootstrap";
import axios from "axios";

function EditCommande({ match }) {
  const initialCommande = {
    id: null,
    articleList: "",
    commandDate: "",
    etat: "",
  };
  const [commande, SetCommande] = useState(initialCommande);
  const [etatC, setEtat] = useState("");
  const [state, setState] = useState(true);
  const [alert, setAlert] = useState("");
  const history = useHistory();

  function handleCommandesChange(e) {
    const { name, value } = e.target;
    SetCommande({ ...commande, [name]: value });
  }
  useEffect(() => {
    async function fetchCommande() {
      const { data } = await axios.get(`/api/commande/${match.params.id}`);
      SetCommande(data);
      setEtat(data.etat);
      if (data.etat == "Non traite") {
        setState(false)
      }else {
        setState(true);
      }
    }
    fetchCommande();
  }, []);

  function updateCommande(e) {
    e.preventDefault();
    if (etatC == "Non traite") {
      let form_data = new FormData();
      form_data.append("articleList", commande.articleList);
      form_data.append("commandDate", commande.commandDate);
      form_data.append("etat", commande.etat);
      debugger;
      axios
        .put(`/api/commande/${match.params.id}`, form_data)
        .then((response) => {
          SetCommande({
            id: response.data.id,
            articleList: response.data.articleList,
            commandDate: response.data.commandDate,
            etat: response.data.etat,
          });
          alert("Commande mis a jour avec succees");
        });
      SetCommande(form_data);
      history.push({
        pathname: "/respo/commandes",
      });
    } else {
      setAlert("Cette commande est deja traité !!!");
      setState(true)
    }
  }
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
                          <a href className="active nav-link">
                            Modifier Etat du commande
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                        {alert && <Alert variant="danger">{alert}</Alert>}
                          <form className="form" onSubmit={updateCommande}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Article</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="articleList"
                                        value={commande.articleList}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Date du commande</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="commandDate"
                                        value={commande.commandDate}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Etat de Commande</label>
                                      <select
                                        //id="etatCommande"
                                        className="form-control"
                                        name="etat"
                                        value={commande.etat}
                                        onChange={handleCommandesChange}
                                      >
                                        <option value="Traite">Traite</option>
                                        <option id="etatCommande" value="Non traite">
                                          Non traite
                                        </option>
                                      </select>
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
                                  //disabled={state}
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
}

export default EditCommande;
