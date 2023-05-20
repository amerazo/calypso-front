// import what you need
import { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditBoard from './EditBoard';


const BoardIcon = ({ boards }) => {
    
    // delete board
    const handleDeleteBoard = async (boardID) => {
       try {
        const options = {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${boardID}`, options);

        console.log('board deleted');

        if (!responseData.ok) {
            throw new Error('Failed to delete board');
        }

        // refresh page after successful deletion
        window.location.reload();

       } catch (error) {
        console.log('Error deleting board: ', error);
       }
    };

    // for edit board modal
    const [showModal, setShowModal] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const handleShowModal = (board) => {
        setSelectedBoard(board);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setSelectedBoard(null);
        setShowModal(false);
    };

    // display board icon
    return (
        <Container>
            <Row>
            {/* map through boards, display title and make each board icon linkable to its id (show page) */}
            {boards.map((board, index) => (
                <Col xs={12} md={4} key={index}>
                    <Card>
                        <Link to={`/boards/${board._id}`} style={{ textDecoration: 'none' }}>
                            <Card.Title>{board.title}</Card.Title>
                        </Link>
                        <Card.Img src="" />
                            <h3>image</h3>
                        <Button onClick={() => handleDeleteBoard(board._id)} className="mt-2">
                                Delete
                        </Button>

                        {/* edit board form */}
                        <Button variant="primary" onClick={() => handleShowModal(board)}>
                            Edit Board
                        </Button>

                        {/* modal for edit board */}
                        <Modal show={showModal && selectedBoard === board} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Board</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <EditBoard board={selectedBoard} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                        </Modal>  
                    </Card>
                 </Col>
             ))}
            </Row>
        </Container>
    )
};

export default BoardIcon;