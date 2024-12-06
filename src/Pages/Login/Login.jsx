import React, { useContext, useEffect, useState } from 'react';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../Api/AuthService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [loginError, setLoginError] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                const { accessToken, user, refreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);


                setAuth({ user, isAuthenticated: true });

                navigate('/home');
            } catch (error) {
                setLoginError(true);
                console.error('Login failed:', error);
            }
        },
    });


    return (
        <div className="background-container">
            <div className="login-card">
                <h1 className="login-title">Tasks</h1>

                <form onSubmit={formik.handleSubmit}>

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="username"
                        touched={formik.touched.username}
                        errors={formik.errors.username}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        touched={formik.touched.password}
                        errors={formik.errors.password}
                    />

                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>

                {loginError && <h6 className="mt-3 text-danger">Invalid username or password</h6>}
            </div>
        </div>
    );
};

export default Login;
