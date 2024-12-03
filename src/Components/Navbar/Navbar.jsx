import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import Button from '../Button/Button';
import Modal from '../Modal/Modal'
import { AuthContext } from '../../Context/AuthContext';
import "./Navbar.css";

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary custom-navbar">
            <div className="container-fluid">
                {/* Tasks text (on the left) */}
                <a className="navbar-brand">Tasks</a>

                {/* Hamburger Icon */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/home"
                                className={`nav-link ${({ isActive }) => (isActive ? "active-link" : "")}`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/tasks"
                                className={`nav-link ${({ isActive }) => (isActive ? "active-link" : "")}`}
                            >
                                Tasks
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Button onClick={openModal}>
                                <FaPowerOff />
                            </Button>

                            <Modal
                                show={showModal}
                                title="Logout"
                                onClose={closeModal}
                                proceedButtonTitle="Logout"
                                submitBtnOnClick={logout}
                            >
                                <h5>Confirm logout</h5>
                            </Modal>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
