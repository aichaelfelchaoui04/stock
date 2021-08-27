import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Categories = () => {
  //add
  const initialCategories = {
    id: null,
    name: "",
    description: "",
  };
  const [categorie, SetCategorie] = useState(initialCategories);

  function handleCategoriesChange(e) {
    const { name, value } = e.target;
    SetCategorie({ ...categorie, [name]: value });
  }

  function submitCategorie() {
    let form_data = new FormData();
    form_data.append("name", categorie.name);
    form_data.append("description", categorie.description);

    axios.post("/category/", form_data).then((response) => {
      SetCategorie({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
      });
      alert("categorie ajoute avec succees");
      window.location.reload();
    });
    SetCategorie(form_data);
  }

  //delete and Edit
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const { data } = await axios.get("/category");
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function deleteCategories(id) {
    axios.delete(`/category/${id}`).then((response) => fetchCategories());
    alert("La commande № " + id + " a ete supprimee avec succees");
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
          <div className="main__greeting">
            <h1>Categorie</h1>
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
                                  <th>Nom Categorie</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories.map((category) => (
                                  <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
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

        {/* Add category */}
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
                              Ajouter Categorie
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitCategorie}>
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

        {/* modify category */}
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
                                  <th>Nom Categorie</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories.map((category) => (
                                  <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          href={`categories/${category.id}`}
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

        {/* delete category */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer cette categorie?
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
                    deleteCategories(IdC);
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
                                  <th>Nom Categorie</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categories.map((category) => (
                                  <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(category.id);
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

export default Categories;
