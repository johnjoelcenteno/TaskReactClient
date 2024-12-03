import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Accordion from '../../Components/Accordion/Accordion';
import Button from '../../Components/Button/Button';
import HomeModals from '../../Components/HomeModals/HomeModals';
import { FaPlus } from 'react-icons/fa';
import generateAccordionItems from '../../Utils/GenerateAccordionItems';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import CategoryService from '../../Services/Category/Category';
import { useToast } from '../../Context/ToastContext';

const Home = () => {
    const setToast = useToast();
    const [categories, setCategories] = useState([]); // Holds categories and tasks

    const navigate = useNavigate();
    const handleNavigation = (url) => navigate(url);

    const [modals, setModals] = useState({
        createCategory: false,
        deleteTask: { isOpen: false, taskTitle: '', taskId: null },
        deleteCategory: { isOpen: false, categoryName: '', categoryId: null },
        updateTask: { isOpen: false, taskTitle: '' },
        updateCategory: { isOpen: false, categoryName: "" },
    });

    const openModal = (modalName, payload = null) => { // refactor this 
        setModals((prev) => {
            if (payload) return { ...prev, [modalName]: { isOpen: true, ...payload } };
            return { ...prev, [modalName]: true };
        });
    };

    const closeModal = (modalName) => { // refactor this
        setModals((prev) => {
            if (typeof prev[modalName] === 'object') return { ...prev, [modalName]: { isOpen: false } };
            return { ...prev, [modalName]: false };
        });
    };

    useEffect(() => {
        CategoryService
            .fetchCategoriesForAccordion()
            .then(accordionData => {
                const categorySelectOptions = accordionData.map(x => ({ value: x.categoryId, label: x.name }));
                setModals(prev => ({ ...prev, categorySelectOptions }));

                setCategories(accordionData);
            })
            .catch(err => {
                setToast({
                    id: Date.now(),
                    title: "Please try again",
                    message: err.message,
                    type: "danger",
                });
            });
    }, []);

    const accordionItems = generateAccordionItems(categories, openModal, handleNavigation, setToast, setCategories);

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
