// import the things you need
import { Container, Card, Button, Modal, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import Task from './Task';
import NewTask from './NewTask';


function CalypsoCard({ boardId, cards }) {
    console.log('CalypsoCardboardId: ', boardId)

    // delete card
    const handleDeleteCard = async (cardId) => {
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
                {cards.map((card) => (
                    <Col xs={12} md={4} key={card._id}>
                    <Card>
                    <Card.Title>{card.title}</Card.Title>
                    <Task task="this is a task" />
                    <Card.Footer>
                    <Button onClick={() => handleDeleteCard(card._id)} className="mt-2">
                            Delete Card
                    </Button>
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
                </Col>
                ))}
                </Row>
            </Container>
        </div> 
    )
};

export default CalypsoCard;
