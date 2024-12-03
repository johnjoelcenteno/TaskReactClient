import Navbar from '../../Components/Navbar/Navbar';
import EditableTable from '../../Components/EditableTable/EditableTable';
function Tasks() {
    const mockTasks = [
        {
            title: "Task 1",
            description: "Description for task 1",
            dueDate: "2024-11-28",
            status: "Pending",
        },
        {
            title: "Task 2",
            description: "Description for task 2",
            dueDate: "2024-11-29",
            status: "In Progress",
        },
        {
            title: "Task 3",
            description: "Description for task 3",
            dueDate: "2024-11-30",
            status: "Completed",
        },
    ];

    return (
        <div className="custom-container">
            <Navbar />
            <section className='mt-5'>
                <h1><span className='fw-bold'>Today's</span> tasks</h1>
            </section>

            <section className="mt-3">
                <EditableTable data={mockTasks} />
            </section>
        </div>
    );
}

export default Tasks;