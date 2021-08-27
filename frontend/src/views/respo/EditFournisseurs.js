import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const EditFournisseur = ({ match }) => {
  const initialSupplier = {
    id: null,
    name: "",
    code: "",
    ICE: 0,
    email: "",
    phone: "",
    societe: "",
  };
  const [supplier, SetSupplier] = useState(initialSupplier);
  const history = useHistory();

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetSupplier({ ...supplier, [name]: value });
  }
  useEffect(() => {
    async function fetchCompte() {
      const { data } = await axios.get(`/api/supplier/${match.params.id}`);
      SetSupplier(data);
    }
    fetchCompte();
  }, []);
  function UpdateSupplier() {
    let form_data = new FormData();
    form_data.append("name", supplier.name);
    form_data.append("code", supplier.code);
    form_data.append("ICE", supplier.ICE);
    form_data.append("email", supplier.email);
    form_data.append("phone", supplier.phone);
    form_data.append("societe", supplier.societe);

    axios
      .put(`/api/supplier/${match.params.id}`, form_data)
      .then((response) => {
        SetSupplier({
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          email: response.data.email,
          ICE: response.data.ICE,
          phone: response.data.phone,
          societe: response.data.societe,
        });
        alert("Fournisseur mis a jour avec succees");
      });
    SetSupplier(form_data);
    history.push({
      pathname: '/respo/suppliers'
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
                            Modifier Client
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={UpdateSupplier}>
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
                                        value={supplier.name}
                                        placeholder="Prenom"
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>code</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="code"
                                        value={supplier.code}
                                        placeholder="code"
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>ICE</label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        name="ICE"
                                        value={supplier.ICE}
                                        placeholder="ICE"
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Email</label>
                                      <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={supplier.email}
                                        placeholder="Adresse electronique"
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Telephone</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                        placeholder="Numero telephone"
                                        value={supplier.phone}
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Societe</label>
                                      <input
                                        className="form-control"
                                        type="url"
                                        name="societe"
                                        value={supplier.societe}
                                        placeholder="example.com"
                                        onChange={handleClientChange}
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
                                  onSubmit={UpdateSupplier}
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
export default EditFournisseur;
