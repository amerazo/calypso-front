// import the things you need
import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import NewCalCard from './NewCalCard';
import CalypsoCard from "./CalypsoCard";

const Board = () => {

    // get the cards (and maybe columns?)
    const [calCards, setCalCards] = useState(null);
    const [columns, setColumns] = useState(null);
    const URL = "";
    useEffect(() => {
        console.log("board_ useEffect ran");
        const fetchBoard = async() => {
            try {
                let responseData = await fetch(URL);
                let allCalCards = await responseData.json();
                console.log(allCalCards);
                setCalCards(allCalCards);
            } catch (error) {}
        };
        fetchBoard()
    }, []);

    // list the cards
    let calCardList;

    if (calCards) {
        calCardList = calCards.map((calCard, index) => {
          return (
              <CalypsoCard key={index} calCard={calCard} />
          );
        });
    };

    // for add new card modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // board_ page
    return (
        <div>
            <h1>My Board Page</h1>
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
                <NewCalCard />
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