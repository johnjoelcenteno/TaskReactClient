import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Accordion from '../../Components/Accordion/Accordion';
import Button from '../../Components/Button/Button';
import HomeModals from '../../Components/HomeModals/HomeModals';
import { FaPlus } from 'react-icons/fa';
import generateAccordionItems from '../../Utils/GenerateAccordionItems';
import { homePageInit } from '../../Hooks/PageInit';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import { useToast } from '../../Context/ToastContext';

const Home = () => {
    const setToast = useToast();
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const handleNavigation = (url) => navigate(url);

    const [modals, setModals] = useState({
        createCategory: false,
        deleteTask: { isOpen: false, taskTitle: '', taskId: null },
        deleteCategory: { isOpen: false, categoryName: '', categoryId: null },
        updateTask: { isOpen: false, taskTitle: '' },
        updateCategory: { isOpen: false, categoryName: "" },
    });

    const openModal = (modalName, payload = null) => {

        setModals((prev) => {
            if (payload) return { ...prev, [modalName]: { isOpen: true, ...payload } };
            return { ...prev, [modalName]: true };
        });
    };

    const closeModal = (modalName) => {
        setModals((prev) => {
            if (typeof prev[modalName] === 'object') return { ...prev, [modalName]: { isOpen: false } };
            return { ...prev, [modalName]: false };
        });
    };

    useEffect(() => {
        homePageInit(setCategories);
    }, []);

    useEffect(() => {
        const categoryOptions = categories.map(category => ({ value: category.categoryId, label: category.name }));
        setModals(prev => ({ ...prev, categoryOptions }));
    }, [categories]);

    const accordionItems = useMemo(() => generateAccordionItems(categories, openModal, handleNavigation, setToast, setCategories), [categories]);
    return (
        <div className="custom-container">
            <Navbar />
            <section className="mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h1 className="d-inline">All categories</h1>
                    <Button
                        variant="success"
                        size="sm"
                        className="add-category-btn"
                        onClick={() => openModal('createCategory')}
                    >
                        <FaPlus />
                    </Button>
                </div>

                <HomeModals modalData={modals} closeModal={closeModal} setCategories={setCategories} />
                <Accordion items={accordionItems} />
            </section>
        </div>
    );
};

export default Home;
