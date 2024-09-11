import React from 'react';
import Logo from "../Assets/Logo on black transparent small_ 4.png";
import user from "../Assets/Ellipse 2.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div style={{ background: '#000000' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={Logo}
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top me-2"
            />
            <h4 className="mb-0 brand pb-1">
              <span className="text-white">sound</span>
              <span style={{ color: '#7e57de' }} className="verse">
                verse
              </span>
            </h4>
            <sup>
              <small className="text-white beta">BETA</small>
            </sup>
            <i className="bi bi-chevron-down text-white dropdown ms-2"></i>
          </a>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex mx-auto pt-2">
              <h6>
                <span style={{ color: '#7e57de' }}>INSPIRATION ZONE</span>
                <i className="bi bi-chevron-down text-white px-2"></i>
              </h6>
            </div>

            <div className="d-flex align-items-center px-5 btns">
              <button className="btn btn-primary me-2 export px-2 ">
                <i className="bi bi-box-arrow-up px-1"></i>
                Export
                <i className="bi bi-chevron-down px-1"></i>
              </button>
              <button className="btn btn-secondary me-2 text-white share px-4 py-2">
                Share
              </button>
            </div>

            <img
              src={user}
              alt="User Profile"
              width="33"
              height="33"
              className="rounded-circle img-fluid mx-2"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
