import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Select from '../Select/Select';
function TaskModal({ validation, closeModal, modal, selectOptions }) {
    return (
        <form onSubmit={validation.handleSubmit}>
            <Modal
                show={modal}
                onClose={() => closeModal()}
                title='Create task'
                proceedButtonClass='btn-success'
                proceedButtonTitle='Save'
                proceedButtonType='submit'
            >

                <Input
                    label="Title"
                    type="text"
                    placeholder="Enter title"
                    value={validation.values.title}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    touched={validation.touched.title}
                    errors={validation.errors.title}
                    name="title"
                />
                <Input
                    label="Description"
                    type="text"
                    placeholder="Enter description"
                    value={validation.values.description}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    touched={validation.touched.description}
                    errors={validation.errors.description}
                    name="description"
                />
                <Input
                    label="Due date"
                    type="date"
                    placeholder="Enter due date"
                    value={validation.values.dueDate}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    touched={validation.touched.dueDate}
                    errors={validation.errors.dueDate}
                    name="dueDate"
                />

                <Select
                    label="Category"
                    options={selectOptions}
                    value={validation.values.categoryId}
                    onChange={validation.handleChange}
                    name="categoryId"
                />
            </Modal>
        </form>
    );
}

export default TaskModal;