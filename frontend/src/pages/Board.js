// import the things you need
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from '../components/NewCalCard';
import CalypsoCard from "../components/CalypsoCard";


const Board = (props) => {

    // set up states
    const [myBoard, setMyBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams(); // get board_id
    console.log('boardId: ', id);

    const boardURL = `http://localhost:4000/boards/${id}`; // board_id route
    const cardsURL = `${boardURL}/cards`; // cards endpoint for the board

    // function to fetch board data
    const fetchBoardData = async() => {
        try {
            let responseData = await fetch(boardURL);
            let boardData = await responseData.json();
            console.log('boardData: ', boardData);
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

    // fetch board data on initial component mount and whenever the 'id' parameter changes
    useEffect(() => {
        console.log('board_ useEffect ran');
        fetchBoardData();
    }, [id]);

    // fetch cards data whenever the 'id' parameter changes
    useEffect(() => {
        console.log('cards useEffect ran');
        fetchCardsData();
    }, [id]);

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
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewCalCard id={id} handleAddCard={handleAddCard} handleCloseModal={handleCloseModal} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  
            
            {/* existing cards */}
            {/* <CalypsoCard title="this is a card" /> */}

            {cards.map((card) => (
                <CalypsoCard key={card.id} title={card.title} />
            ))}    
        </div>
    )
};

export default Board;
