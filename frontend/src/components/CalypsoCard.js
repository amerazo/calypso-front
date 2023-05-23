// import the things we need
import { Container, Card, Button, Modal, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';

// create component, pass props
const CalypsoCard = ({ boardId, cards }) => {

    // set up states
    const [tasks, setTasks] = useState([]);
    // state for specific card modal
    const [modalVisible, setModalVisible] = useState({});

    // delete card
    const handleDeleteCard = async (cardId) => {
        // in case cardId is undefined
        console.log(cardId);
        try {
         const options = {
             method: 'DELETE', 
             headers: {
                 'Content-Type': 'application/json'
             }
         };
         const responseData = await fetch(`http://localhost:4000/boards/${boardId}/cards/${cardId}`, options);
         console.log('card deleted');
         if (!responseData.ok) {
             throw new Error('Failed to delete card');
         }
         // refresh page after successful deletion
         window.location.reload();
        } catch (error) {
         console.log('Error deleting card: ', error);
        }
     };

    // new task handle
    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        // refresh page after adding new task
        window.location.reload();
    };
    
    // add new task modal
    const handleShowModal = (cardId) => {
        // Set the modal visibility for the specific cardId to true
        setModalVisible((prevModalVisible) => ({
        ...prevModalVisible,
        [cardId]: true,
        }));
    };
    const handleCloseModal = (cardId) => {
        // Set the modal visibility for the specific cardId to false
        setModalVisible((prevModalVisible) => ({
        ...prevModalVisible,
        [cardId]: false,
      }));
    };


    // display card
    return (
        <div>
            <Container>
                <Row>
                    {/* map over existing cards */}
                    {cards.map((card) => (
                        <Col xs={12} md={4} key={card._id}>
                            <Card>
                                <Card.Title>{card.title}</Card.Title>
                                <Task boardId={boardId} cardId={card._id} tasks={card.tasks}/>
                                {/* buttons in footer */}
                                <Card.Footer>
                                <Button onClick={() => handleDeleteCard(card._id)} className="mt-2">
                                    Delete Card
                                </Button>
                                <Button variant="primary" onClick={() => handleShowModal(card._id)}>
                                    Add New Task
                                </Button>
                                </Card.Footer>
                            </Card>
                            {/* create NewTask modal */}
                            <Modal show={modalVisible[card._id]} onHide={() => handleCloseModal(card._id)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create a New Task</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewTask cardId={card._id} boardId={boardId} handleAddTask={handleAddTask} handleCloseModal={() => handleCloseModal(card._id)} />
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleCloseModal(card._id)}>
                                    Cancel
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div> 
    )
};

export default CalypsoCard;