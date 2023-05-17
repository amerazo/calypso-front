// import react stuff
import { useEffect, useState } from "react";
// import bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Modal } from 'react-bootstrap';
import Board from "../components/Board";
import NewBoard from "../components/NewBoard";

const Boards = () => {
    // get the boards
    const [boards, setBoards] = useState(null);
    const URL = "";
    useEffect(() => {
        console.log("boards useEffect ran");
        const fetchBoards = async() => {
            try {
                let responseData = await fetch(URL);
                let allBoards = await responseData.json();
                console.log(allBoards);
                setBoards(allBoards);
            } catch (error) {}
        };
        fetchBoards()
    }, []);

    // list the boards
    let boardList;

    if (boards) {
        boardList = boards.map((board, index) => {
          return (
              <Board key={index} board={board} />
          );
        });
    };

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
            <h1>Boards Page</h1>
            <h3>My Boards</h3>
            {/* existing board cards */}
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
            </Container>

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