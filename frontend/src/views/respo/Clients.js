import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

import axios from "axios";

const Clients = () => {
  //add
  const initialClient = {
    id: null,
    name: "",
    adress: "",
    email: "",
    phone: "",
  };
  const [client, SetClient] = useState(initialClient);

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetClient({ ...client, [name]: value });
  }

  function submitClient() {
    let form_data = new FormData();
    form_data.append("name", client.name);
    form_data.append("adress", client.adress);
    form_data.append("email", client.email);
    form_data.append("phone", client.phone);

    axios.post("http://192.168.110.1:3001/client/", form_data).then((response) => {
      SetClient({
        id: response.data.id,
        name: response.data.name,
        adress: response.data.adress,
        email: response.data.email,
        phone: response.data.phone,
      });
      alert("client ajoute avec succees");
      window.location.reload();
    });
    SetClient(form_data);
  }

  //delete and Edit
  const [clients, setClients] = useState([]);

  async function fetchClients() {
    const { data } = await axios.get("http://localhost:3001/client");
    setClients(data);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  function deleteClient(id) {
    axios.delete(`http://localhost:3001/client/${id}`).then((response) => fetchClients());
    alert("Le client № " + id + " a ete supprimee avec succees");
    window.location.reload();
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
  const [IdC, setId] = useState();

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
            <h1>Clients</h1>
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
                                  <th style={{ width: "5%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>Adresse</th>
                                  <th style={{ width: "5%" }}>Email</th>
                                  <th style={{ width: "5%" }}>Telephone</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.adress}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
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

        {/* Add Client */}
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
                            <a href className="active nav-link">
                              Ajouter Client
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitClient}>
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
                                          placeholder="Nom"
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
                                    onSubmit={submitClient}
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

        {/* Modify Client */}
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
                            <a href className="active nav-link">
                              Modifier Client
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
                                  <th>Nom</th>
                                  <th>Adresse</th>
                                  <th>email</th>
                                  <th>Telephone</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.adress}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a className="editIcon" 
                                        href={`clients/${client.id}`}>
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

        {/* Delete Client */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer ce client?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <Button
                  variant="info"
                  onClick={() => {
                    handleClose();
                  }}
                  block
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    deleteClient(IdC);
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
                                  <th>Nom</th>
                                  <th>Adresse</th>
                                  <th>email</th>
                                  <th>Telephone</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.adress}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(client.id)
                                            handleOpen()
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

export default Clients;
