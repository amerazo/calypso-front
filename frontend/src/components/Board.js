// import the things you need
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from './NewCalCard';
import CalypsoCard from "./CalypsoCard";


const Board = (props) => {

    // get the board
    const [myBoard, setMyBoard] = useState(null);
    const [newCardData, setNewCardData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    const { id } = useParams();
    console.log('id: ', id);

    const URL = `https://calypso-back-end.onrender.com/boards/${id}`; // board_id routes

    useEffect(() => {
        console.log("board_ useEffect ran");
        const fetchBoard = async() => {
            try {
                let responseData = await fetch(URL);
                let boardData = await responseData.json();
                console.log('boardData: ', boardData);
                setMyBoard(boardData);
                setEditedTitle(boardData.title);
            } catch (error) {}
        };
        fetchBoard()
    }, []);

    // handle board title update
    const handleUpdateTitle = async () => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editedTitle })
            };
            const responseData = await fetch(URL, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update board title');
            }
            setEditMode(false);
            window.location.reload(); // refresh the page
        } catch (error) {
            console.log('Error updating board title: ', error);
        }
    };

    // for add new card modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setNewCardData({ title: '', tasks: [] });
        setShowModal(false);
    };

    // board_ page
    return (
        <div>
            {/* title and edit title */}
            {myBoard ? (
                <h1>
                {editMode ? (
                    <input 
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                ) : (
                    <span onClick={() => setEditMode(true)}>
                        {myBoard.title}
                    </span>
                )}
                {editMode && (
                    <Button variant='primary' onClick={handleUpdateTitle}>
                        Save
                    </Button>
                )}
                </h1>
                ) : (
                    <h2>LOADING.. </h2>)}

            {/* new card form */}
            <Button variant="primary" onClick={handleShowModal}>
                Add New Card
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCalCard id={id} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  
            
            {/* existing cards */}
            <CalypsoCard title="this is a card" />
                 
        </div>
    )
};

export default Board;
