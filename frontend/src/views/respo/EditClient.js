import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const EditClt = ({ match }) => {
  debugger;
  const initialClient = {
    id: null,
    name: "",
    adress: "",
    email: "",
    phone: "",
  };
  const [client, SetClient] = useState(initialClient);
  const history = useHistory();

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetClient({ ...client, [name]: value });
  }
  useEffect(() => {
    async function fetchClient() {
      const { data } = await axios.get(`http://localhost:3001/client/${match.params.id}`);
      SetClient(data);
    }
    fetchClient();
  }, []);
  function updateClient() {
    let form_data = new FormData();
    form_data.append("name", client.name);
    form_data.append("adress", client.adress);
    form_data.append("email", client.email);
    form_data.append("phone", client.phone);

    axios.put(`/api/client/${match.params.id}`, form_data).then((response) => {
      SetClient({
        id: response.data.id,
        name: response.data.name,
        adress: response.data.adress,
        email: response.data.email,
        phone: response.data.phone,
      });
      alert("client mis a jour avec succees");
    });
    SetClient(form_data);
    history.push({
      pathname: '/respo/clients'
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
                          <form className="form" onSubmit={updateClient}>
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
                                        value={client.name}
                                        placeholder="Prenom"
                                        onChange={handleClientChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Adresse</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="adress"
                                        value={client.adress}
                                        placeholder="Adresse"
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
                                        value={client.email}
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
                                        value={client.phone}
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
                                  onSubmit={updateClient}
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
export default EditClt;
