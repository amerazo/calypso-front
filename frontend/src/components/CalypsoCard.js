// import the things we need
import { Container, Card, Button, Modal, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';
import './CalypsoCard.css'
// create component, pass props
const CalypsoCard = ({ boardId, cards }) => {

    // set up states
    const [tasks, setTasks] = useState([]);
    // state for specific card modal
    const [modalVisible, setModalVisible] = useState({});
    // for editing card title
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    const cardsURL = `https://calypso-back-end.onrender.com/boards/${boardId}/cards/`;

    // handle entering edit mode
    const enterEditMode = (cardId) => {
        setEditMode(cardId);
        setEditedTitle('');
    };
  
    // handle exiting edit mode
    const exitEditMode = () => {
        setEditMode('');
        setEditedTitle('');
    };

    // handle card title update
    const handleUpdateCardTitle = async (cardId) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editedTitle })
            };
            const responseData = await fetch(`${cardsURL}/${cardId}`, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update card title');
            }
            exitEditMode();
            window.location.reload(); // refresh the page
        } catch (error) {
            console.log('Error updating  title: ', error);
        }
    };

    // delete card
    const handleDeleteCard = async (cardId) => {
        try {
         const options = {
             method: 'DELETE', 
             headers: {
                 'Content-Type': 'application/json'
             }
         };
         const responseData = await fetch(`${cardsURL}/${cardId}`, options);
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
                            <Card.Title>
                                {editMode === card._id ? (
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />
                                ) : (
                                <span className='card-title' onClick={() => enterEditMode(card._id)}>
                                    {card.title}
                                </span> )}
                                {editMode === card._id && (
                                <Button variant='primary' onClick={() => handleUpdateCardTitle(card._id)}>
                                    Save
                                </Button> )}
                                </Card.Title>
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