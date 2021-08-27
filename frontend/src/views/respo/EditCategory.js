import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

function EditCategories({ match }) {
  const initialCategories = {
    id: null,
    name: "",
    description: "",
  };
  const [categorie, SetCategorie] = useState(initialCategories);
  const history = useHistory();

  function handleCategoriesChange(e) {
    const { name, value } = e.target;
    SetCategorie({ ...categorie, [name]: value });
  }
  useEffect(() => {
    async function fetchCategory() {
      const { data } = await axios.get(`/category/${match.params.id}`);
      SetCategorie(data);
    }
    fetchCategory();
  }, []);
  function updateCategorie() {
    let form_data = new FormData();
    form_data.append("name", categorie.name);
    form_data.append("description", categorie.description);

    axios
      .put(`/category/${match.params.id}`, form_data)
      .then((response) => {
        SetCategorie({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        });
        alert("categorie mise a jour avec succees");
      });
    SetCategorie(form_data);
    history.push({
      pathname: '/respo/categories'
    })
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
                            Modifier Categorie
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={updateCategorie}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Nom</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Nom du categorie"
                                        value={categorie.name}
                                        onChange={handleCategoriesChange}
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
                                        placeholder="description"
                                        rows={4}
                                        value={categorie.description}
                                        onChange={handleCategoriesChange}
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
                                  onSubmit={updateCategorie}
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

export default EditCategories;
