import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import TicketForm from '../Ticket/CreateTicketForm';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">Rockz Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#createModal">Create</button>
              </li>
            </ul>
            {/* <form className="d-flex" > */}
            
            <FontAwesomeIcon icon="user" />
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button type="button" className="btn btn-outline-primary">Search</button> */}
            {/* </form> */}
          </div>
        </div>
      </nav>
      <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <TicketForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
