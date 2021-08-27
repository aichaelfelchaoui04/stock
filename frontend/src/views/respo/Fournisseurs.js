import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Suppliers = () => {
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

  //Add Fournisseur
  const initialFournisseurs = {
    id: null,
    name: "",
    code: "",
    ICE: 0,
    email: "",
    phone: "",
    societe: "",
  };
  const [fournisseur, SetFournisseur] = useState(initialFournisseurs);
  const [fournisseurs, SetFournisseurs] = useState([]);

  function handleFournisseursChange(e) {
    const { name, value } = e.target;
    SetFournisseur({ ...fournisseur, [name]: value });
  }

  function submitFournisseur() {
    let form_data = new FormData();
    form_data.append("name", fournisseur.name);
    form_data.append("code", fournisseur.code);
    form_data.append("ICE", fournisseur.ICE);
    form_data.append("email", fournisseur.email);
    form_data.append("phone", fournisseur.phone);
    form_data.append("societe", fournisseur.societe);
    debugger;
    axios.post("/api/supplier/", form_data).then((response) => {
      SetFournisseur({
        id: response.data.id,
        name: response.data.name,
        code: response.data.code,
        email: response.data.email,
        ICE: response.data.ICE,
        phone: response.data.phone,
        societe: response.data.societe,
      });
      alert("Fournisseur ajoutee avec succees");
      window.location.reload();
    });
    SetFournisseur(form_data);
  }

  async function fetchFournisseurs() {
    const { data } = await axios.get("/api/supplier");
    SetFournisseurs(data);
  }

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  function deleteFournisseur(id) {
    axios.delete(`/api/supplier/${id}`).then((response) => fetchFournisseurs());
    alert("Le fournisseur № " + id + " a ete supprimee avec succees");
    window.location.reload();
  }

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
            <h1>Fournisseurs</h1>
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
                                  <th style={{ width: "15%" }}>code</th>
                                  <th style={{ width: "5%" }}>Email</th>
                                  <th style={{ width: "3%" }}>ICE</th>
                                  <th style={{ width: "5%" }}>Telephone</th>
                                  <th style={{ width: "10%" }}>societe</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.code}</td>
                                    <td>{supplier.ICE}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.societe}</td>
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
                              Ajouter Fournisseur
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitFournisseur}>
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
                                          value={fournisseur.name}
                                          placeholder="Nom"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.code}
                                          placeholder="code"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.ICE}
                                          placeholder="ICE"
                                          onChange={handleFournisseursChange}
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
                                        value={fournisseur.email}
                                        placeholder="Adresse electronique"
                                        onChange={handleFournisseursChange}
                                      />
                                    </div>
                                  </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Telephone</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="phone"
                                          placeholder="Numero telephone"
                                          value={fournisseur.phone}
                                          onChange={handleFournisseursChange}
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
                                          type="text"
                                          name="societe"
                                          value={fournisseur.societe}
                                          placeholder="example.com"
                                          onChange={handleFournisseursChange}
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
                                    onSubmit={submitFournisseur}
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

        {/* Modify Fournisseur */}
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
                              Modifier Fournisseur
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
                                  <th style={{ width: "5%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>code</th>
                                  <th style={{ width: "5%" }}>Email</th>
                                  <th style={{ width: "3%" }}>ICE</th>
                                  <th style={{ width: "5%" }}>Telephone</th>
                                  <th style={{ width: "10%" }}>societe</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.code}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.ICE}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.societe}</td>
                                    <td>
                                      <div className="form-button-action">
                                      <a className="editIcon" 
                                      href={`suppliers/${supplier.id}`}>
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

        {/* Delete Fournisseur */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer ce fournisseur?
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
                    deleteFournisseur(IdC);
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
                            <a href className="active nav-link">
                              Supprimer Fournisseur
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
                                    <th style={{ width: "5%" }}>Nom</th>
                                    <th style={{ width: "15%" }}>code</th>
                                    <th style={{ width: "5%" }}>Email</th>
                                    <th style={{ width: "3%" }}>ICE</th>
                                    <th style={{ width: "5%" }}>Telephone</th>
                                    <th style={{ width: "10%" }}>societe</th>
                                  </tr>
                              </thead>
                              <tbody>
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.code}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.ICE}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.societe}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(supplier.id)
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

export default Suppliers;
