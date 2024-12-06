import Navbar from '../../Components/Navbar/Navbar';
import EditableTable from '../../Components/EditableTable/EditableTable';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import TaskModal from '../../Components/TaskModal/TaskModal';
import { useSubmissionHandlers } from '../../Hooks/useSubmissionHandlers';
import { useCreateTaskForm } from '../../Hooks/useFormValidation';
import { FaPlus } from 'react-icons/fa';
import { taskPageInit } from '../../Hooks/PageInit';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Tasks.css';
function Tasks() {
    const { id: categoryId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [pageTitle, setPageTitle] = useState("Loading");
    const [modal, setModal] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const closeModal = () => setModal(false);


    useEffect(() => {
        taskPageInit(categoryId, setPageTitle, setTasks, setSelectOptions);
    }, []);

    const { createTaskSubmission } = useSubmissionHandlers(closeModal, null, null, setTasks);
    const validation = useCreateTaskForm(createTaskSubmission, categoryId);

    return (
        <div className="custom-container">
            <Navbar />
            <section className='mt-5 d-flex justify-content-between'>
                <h1><span className='fw-bold d-inline'>{pageTitle}</span> tasks</h1>
                <Button
                    variant='success'
                    size="sm"
                    type="button"
                    onClick={() => setModal(true)}
                    className='add-task-btn'
                >
                    <FaPlus />
                </Button>
            </section>

            <section className="mt-3">
                {tasks && <EditableTable tasks={tasks} setTasks={setTasks} />}
            </section>

            <TaskModal validation={validation} closeModal={closeModal} modal={modal} selectOptions={selectOptions} />
        </div>
    );
}

export default Tasks;