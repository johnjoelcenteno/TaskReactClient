import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/home");
    };

    return (
        <div className="page-not-found-container">
            <h1 className="page-not-found-title">404</h1>
            <p className="page-not-found-message">Oops! The page you're looking for doesn't exist.</p>
            <button className="btn btn-primary shadow btn-page-not-foundbtn-page-not-foundS" onClick={handleGoHome}>
                Go to Home
            </button>
        </div>
    );
};

export default PageNotFound;
