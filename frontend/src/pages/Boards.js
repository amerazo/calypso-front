// import the things we need
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import NewBoard from "../components/NewBoard";
import BoardIcon from '../components/BoardIcon';

// create component, pass props
const Boards = (props) => {
    
    // set up states
    const [boards, setBoards] = useState(null);
    const URL = "https://calypso-back-end.onrender.com/boards";

    // get the boards
    useEffect(() => {
        const fetchBoards = async() => {
            try {
                let responseData = await fetch(URL);
                let allBoards = await responseData.json();
                setBoards(allBoards);
            } catch (error) {}
        };
        fetchBoards()
    }, []);

    // for add new board modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // boards page
    return (
        <div>
            <h1>My Boards</h1>
            
            {/* existing boards */}
            {boards ? <BoardIcon boards={boards} /> : <h2>LOADING.. </h2>}

            {/* new board form */}
            <Button variant="primary" onClick={handleShowModal}>
                Add New Board
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Board</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <NewBoard />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </Modal.Footer>
            </Modal>       
        </div>
    )
};

export default Boards;