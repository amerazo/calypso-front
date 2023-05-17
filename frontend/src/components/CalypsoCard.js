// import the things you need
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';


function CalypsoCard({ title }) {
    
    // for add new task modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Container>
            <Card style={{width: "300px"}}>
                <Card.Title>{title}</Card.Title>
                <Task task="this is a task" />
            <Card.Footer>
            <Button variant="primary" onClick={handleShowModal}>
                    Add New Task
            </Button>
            </Card.Footer>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Task</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <NewTask />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </Modal.Footer>
            </Modal>
            </Container>
        </div> 
    )
};

export default CalypsoCard;