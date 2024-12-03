import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Tasks from '../Pages/Tasks/Tasks';
import ProtectedRoute from '../Components/ProtectedRoute';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import { Route } from 'react-router-dom';
const GenerateRoutes = () => {
    return (
        <>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><PageNotFound /></ProtectedRoute>} />
        </>
    );
}

export default GenerateRoutes;