// import the things we need
import { Container, Card, Button, Modal, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';

// create component, pass props
function CalypsoCard({ boardId, cards }) {
    
    // in case boardId undefined
    console.log('CalypsoCardboardId: ', boardId)

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
         const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${boardId}/cards/${cardId}`, options);
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
    
    // add new task modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
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
                                <Task task="this is a task" />
                                {/* buttons in footer */}
                                <Card.Footer>
                                <Button onClick={() => handleDeleteCard(card._id)} className="mt-2">
                                    Delete Card
                                </Button>
                                <Button variant="primary" onClick={handleShowModal}>
                                    Add New Task
                                </Button>
                                </Card.Footer>
                            </Card>
                            {/* create NewTask modal */}
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
                        </Col>
                    ))}
                </Row>
            </Container>
        </div> 
    )
};

export default CalypsoCard;