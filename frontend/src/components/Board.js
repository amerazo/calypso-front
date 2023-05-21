// import the things you need
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from './NewCalCard';
import CalypsoCard from "./CalypsoCard";


const Board = (props) => {

    // set up states
    const [myBoard, setMyBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams();
    console.log('id: ', id);

    const URL = `https://calypso-back-end.onrender.com/boards/${id}`; // board_id route

    // board data - title and card ids
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

    // card data 
    useEffect(() => {
        console.log("cards useEffect ran");
        const fetchCards = async () => {
            try {
                const response = await fetch(`${URL}/cards`);
                const cardsData = await response.json();
                const filteredCards = cardsData.filter(card => card.boardId === id); // filter cards by boardId
                setCards(filteredCards);
            } catch (error) {
                console.log('Error fetching cards: ', error);
            }
        };
        fetchCards();
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
