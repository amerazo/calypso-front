// import the things we need
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from '../components/NewCalCard';
import CalypsoCard from "../components/CalypsoCard";

// create component, pass props
const Board = (props) => {

    // set up states
    const [myBoard, setMyBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // get boardId
    const { boardId } = useParams(); 

    // specific board route
    const boardURL = `http://localhost:4000/boards/${boardId}`; 
    // cards endpoint for the board
    const cardsURL = `${boardURL}/cards`; 

    // function to fetch board data
    const fetchBoardData = async() => {
        try {
            let responseData = await fetch(boardURL);
            let boardData = await responseData.json();
            setMyBoard(boardData);
            setEditedTitle(boardData.title);
        } catch (error) {
            console.log('Error fetching board data: ', error)
        }
    };

    // function to fetch card data 
    const fetchCardsData = async () => {
        try {
            const response = await fetch(cardsURL);
            const cardsData = await response.json();
            setCards(cardsData);
        } catch (error) {
            console.log('Error fetching cards: ', error);
        }
    };

    // fetch board and card data on initial component mount and whenever the id parameter changes
    useEffect(() => {
        fetchBoardData();
        fetchCardsData();
    }, [boardId]);

    // fetch cards data whenever the boardId parameter changes
    useEffect(() => {
        fetchCardsData();
    }, [boardId]);

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
            const responseData = await fetch(boardURL, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update board title');
            }
            setEditMode(false);
            window.location.reload(); // refresh the page
        } catch (error) {
            console.log('Error updating board title: ', error);
        }
    };

    // new card handle
    const handleAddCard = (newCard) => {
        setCards([...cards, newCard]);
    };

    // for add new card modal
    const handleShowModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };      

    // my board page
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
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCalCard boardId={boardId} handleAddCard={handleAddCard} handleCloseModal={handleCloseModal} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  
            
            {/* existing cards */}
            {cards ? <CalypsoCard cards={cards} boardId={boardId} /> : <h2>LOADING.. </h2>}
        </div>
    )
};

export default Board;