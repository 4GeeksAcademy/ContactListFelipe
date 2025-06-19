import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export function Contact({ contact }) {
  const { store, dispatch } = useGlobalReducer();
  const [showConfirm, setShowConfirm] = useState(false);

  async function confirmDelete() {
    try {
      const response = await fetch(
        `${store.baseUrl}/agendas/Felipe/contacts/${contact.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch({ type: "DELETE_CONTACT", payload: contact.id });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowConfirm(false);
    }
  }

  return (
    <>
      <div className="container col-10 card mb-3 h-auto">
        <div className="row px-3">
          <div className="col-2 p-2">
            <img
              src="https://picsum.photos/300"
              className="img-fluid rounded-circle image-thumbnail p-3"
              alt="Foto del contacto"
            />
          </div>
          <div className="col-10">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{contact.name}</h5>
                <div className="ms-auto">
                  <Link
                    to={`/edit-contact/${contact.id}`}
                    className="text-decoration-none text-reset me-3"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Link>
                  <span onClick={() => setShowConfirm(true)} role="button">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </div>
              </div>
              <p className="card-text text-secondary my-1">
                <i className="fa-solid fa-phone"></i> {contact.phone}
              </p>
              <p className="card-text text-secondary my-1">
                <i className="fa-solid fa-envelope"></i> {contact.email}
              </p>
              <p className="card-text text-secondary my-1">
                <i className="fa-solid fa-location-dot"></i> {contact.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Deseas eliminar a <strong>{contact.name}</strong> de tus
                  contactos?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}