import React, { useState } from 'react';
import Input from '../Input/Input'; // Adjust the path to your Input component
import Button from '../Button/Button'; // Adjust the path to your Button component
import { FaPlus } from "react-icons/fa";
import './FooterInput.css'; // Add any custom styles if needed

const FooterInput = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value) => {
        setInputValue(value); // Update the input value
    };

    const handleSubmit = () => {
        alert(`Submitted: ${inputValue}`);
        setInputValue(''); // Clear input after submission
    };

    return (
        <div className="footer-input-container">
            <Input
                type='text'
                placeholder="Add new category"
                size="lg"
                value=''
                onChange={() => { }}
            />

            <div className='d-flex justify-content-center'>
                <button className='btn btn-success btn-sm fw-bold add-category-btn'>Add</button>
            </div>
        </div>
    );
};

export default FooterInput;