// import the things you need
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from './NewCalCard';
import CalypsoCard from "./CalypsoCard";

const Board = (props) => {

    // get the cards
    const [myBoard, setMyBoard] = useState(null);
    // const [columns, setColumns] = useState(null);
    const [newCardData, setNewCardData] = useState({ title: '', tasks: [] });


    const { id } = useParams();
    console.log('id: ', id);

    const URL = `https://calypso-back-end.onrender.com/boards/${id}`; // fetch a board by id

    useEffect(() => {
        console.log("board_ useEffect ran");
        const fetchBoard = async() => {
            try {
                let responseData = await fetch(URL);
                let boardData = await responseData.json();
                console.log('boardData: ', boardData);
                setMyBoard(boardData);
            } catch (error) {}
        };
        fetchBoard()
    }, []);

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
            {myBoard ? <h1>{myBoard.title}</h1> : <h2>LOADING.. </h2>}
            <h3>My Cards</h3>
            {/* existing cards */}
            <CalypsoCard title="this is a card" />

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
        </div>
    )
};

export default Board;